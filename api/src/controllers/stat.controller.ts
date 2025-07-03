import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';
import * as statService from '../services/stat.service';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden: Only schools can create stats' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const stat = await statService.createStat({ ...req.body, id_school });
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création stat.', error });
  }
};

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findByPk(req.user.id);
    const id_school = user?.getDataValue('id_role');

    const stats = await statService.getAllBySchool(id_school);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération stats.', error });
  }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updated = await statService.updateStat(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'Stat non trouvée.' });

    res.status(200).json({ message: 'Stat mise à jour.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour stat.', error });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const deleted = await statService.deleteStat(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Stat non trouvée.' });

    res.status(200).json({ message: 'Stat supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression stat.', error });
  }
};
