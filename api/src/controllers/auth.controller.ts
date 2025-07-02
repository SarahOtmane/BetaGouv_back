import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, phone_number, name, role} = req.body;

    if(!email || !password || !phone_number || !name || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await registerUser({ 
      email, password, phone_number, name, role,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'An error occurred' });
  }
};
