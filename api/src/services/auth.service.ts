import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import Adress from '../models/adress.model';
import Company from '../models/company.model';
import School from '../models/school.model';

/**
 * Enregistre un nouvel utilisateur dans la base de données
 * enregister un user avec les infos principales (email, password, phone_number, name, role )
 * creer une adresse si elle n'existe pas déjà
 * creer une entreprise si le role est 'company' et les infos SIRET et activite_principale sont fournies
 */
export const registerUser = async (userData: {
  email: string;
  password: string;
  phone_number: string;
  name: string;
  role: string;
  rue: string;
  code_postal: string;
  ville: string;
  pays: string;
  SIRET: string;
  activite_principale: string;
}): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const { rue, code_postal, ville, pays, SIRET, activite_principale } = userData;
  const existingAdress = await Adress.findOne({ where: { rue, code_postal, ville, pays } });
  let adressID : number;
  if(existingAdress) {
    adressID = existingAdress.getDataValue('id');
  } else {
    const newAdress = await Adress.create({ rue, code_postal, ville, pays });
    adressID = newAdress.getDataValue('id');
  }

  if(userData.role !== 'company' && userData.role !== 'school') {
    throw new Error('Invalid role. Must be "company" or "school".');
  }

  if (userData.role === 'company' && (!SIRET || !activite_principale)) {
    throw new Error('SIRET and activite_principale are required for company role');
  }

  if (userData.role === 'school' && (!SIRET)) {
    throw new Error('SIRET are required for school role');
  }

  if (userData.role === 'company'){
    const newCompany = await Company.create({
      SIRET: userData.SIRET,
      activite_principale: userData.activite_principale,
    });

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      id_adress: adressID,
      id_role: newCompany.getDataValue('id'),
    });

    return newUser.toJSON() as IUser;
  }else if( userData.role === 'school'){
    const newSchool = await School.create({
      SIRET: userData.SIRET,
    });

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      id_adress: adressID,
      id_role: newSchool.getDataValue('id'),
    });

    return newUser.toJSON() as IUser;
  }
};

/**
 * Authentifie un utilisateur et retourne un token JWT
 */
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<string> => {
  const user = await User.findOne({ where: { email: credentials.email } });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(credentials.password, user.getDataValue('password'));
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      id: user.getDataValue('id'),
      role: user.getDataValue('role'),
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return token;
};
