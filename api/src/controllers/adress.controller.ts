import { Request, Response } from 'express';
import * as adressService from '../services/adress.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const createAdress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { rue, code_postal, ville, pays } = req.body;

    if (!rue || !code_postal || !ville || !pays) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newAdress = await adressService.createAdress({ rue, code_postal, ville, pays });
    res.status(201).json(newAdress);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'adresse.", error });
  }
};

export const getAdressById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const adress = await adressService.getAdressById(Number(id));

    if (!adress) {
      return res.status(404).json({ message: "Adresse introuvable." });
    }

    res.status(200).json(adress);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'adresse.", error });
  }
};
