import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import * as highlightService from '../services/mouthly_highlight.service';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden: Only schools can create highlights' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const { photo, description, mouth, type } = req.body;
    if (!photo || !description || !mouth || !type) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const highlight = await highlightService.createHighlight({
      photo,
      description,
      mouth,
      type,
      id_school,
    });

    res.status(201).json(highlight);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création highlight.', error });
  }
};

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const highlights = await highlightService.getAllBySchool(id_school);
    res.status(200).json(highlights);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération highlights.', error });
  }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updated = await highlightService.updateHighlight(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'Highlight non trouvé.' });

    res.status(200).json({ message: 'Highlight mis à jour.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour highlight.', error });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const deleted = await highlightService.deleteHighlight(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Highlight non trouvé.' });

    res.status(200).json({ message: 'Highlight supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression highlight.', error });
  }
};
