import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import * as internshipService from '../services/internship.service';


/**
 * Contrôleur pour la gestion des stages
 * - Créer un stage
 * - Récupérer tous les stages d'une école
 * - Mettre à jour un stage
 * - Supprimer un stage
 *
 * le body de la requête pour créer un stage doit contenir :
 * {
 *  "type": "stage",
 *  "date_debut": "2023-10-01T00:00:00Z",
 *  "date_fin": "2023-10-31T00:00:00Z"
 * }
 */
export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden: Only schools can create internships' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const { type, date_debut, date_fin } = req.body;
    if (!type || !date_debut || !date_fin) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const internship = await internshipService.createInternship({ type, date_debut, date_fin, id_school });
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création internship.', error });
  }
};

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const internships = await internshipService.getAllBySchool(id_school);
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération internships.', error });
  }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updated = await internshipService.updateInternship(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'Internship non trouvé.' });

    res.status(200).json({ message: 'Internship mis à jour.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour internship.', error });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const deleted = await internshipService.deleteInternship(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Internship non trouvé.' });

    res.status(200).json({ message: 'Internship supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression internship.', error });
  }
};
