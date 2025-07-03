import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';


/**
 * Authentification Controller
 * 
 * Ce contrôleur gère l'enregistrement et la connexion des utilisateurs.
 * 
 * - `register`: Enregistre un nouvel utilisateur avec les informations fournies.
 * - `login`: Authentifie un utilisateur et retourne un token JWT.
 */

/**
  Enregistre un nouvel utilisateur.
  Le body de la requête doit contenir :
  {
    "email": "test",
    "password: "password123",
    "phone_number": "0123456789",
    "name": "John Doe",
    "role": "company" | "school" | "admin",
    "rue": "123 Rue de Paris",
    "code_postal": "75001",
    "ville": "Paris",
    "pays": "France",
    "SIRET": "12345678900011",
    "activite_principale": "Développement web"
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { 
      email, password, phone_number, name, role,
      rue, code_postal, ville, pays,
      SIRET, activite_principale,  
    } = req.body;

    if(!email || !password || !phone_number || !name || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await registerUser({ 
      email, password, phone_number, name, role,
      rue, code_postal, ville, pays,
      SIRET, activite_principale,  
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};


/**
  Authentifie un utilisateur et retourne un token JWT.
  Le body de la requête doit contenir :
  {
    "email": "test",
    "password": "password123"
  }
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};
