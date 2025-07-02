import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

/**
 * Enregistre un nouvel utilisateur dans la base de données
 */
export const registerUser = async (userData: {
  email: string;
  password: string;
  phone_number: string;
  name: string;
  role: string;
}): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return newUser.toJSON() as IUser;
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
