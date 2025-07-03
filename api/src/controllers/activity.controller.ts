import { Response } from 'express';
import * as activityService from '../services/activity.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';


/**
 * Contrôleur pour la gestion des activités
 * - Créer une nouvelle activité
 * - Récupérer toutes les activités d'une école
 * - Récupérer une activité par son ID
 * - Mettre à jour une activité
 * - Supprimer une activité
 *
 */

/* * Crée une nouvelle activité pour une école.
 * Le body de la requête doit contenir :
 * {
 *   "type": "événement",
 *   "date": "2023-10-01T00:00:00Z"
 * }
 */ 
export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
        return res.status(403).json({ error: 'Forbidden: Only schools can add websites' });
    }

    const user = await User.findByPk(req.user.id);

    const { type, date } = req.body;
    if (!type || !date) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const activity = await activityService.createActivity({ type, date, id_school : user.getDataValue('id_role') });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création activité.', error });
  }
};

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'school') {
        return res.status(403).json({ error: 'Forbidden: Only schools can add websites' });
    }
    const user = await User.findByPk(req.user.id);

    const activities = await activityService.getAllActivitiesOfSchool(Number(user.getDataValue('id_role')));
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération activités.', error });
  }
};

export const getById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const activity = await activityService.getActivityById(Number(req.params.id));
    if (!activity) return res.status(404).json({ message: 'Activité non trouvée.' });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération activité.', error });
  }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = await activityService.updateActivity(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'Activité non trouvée.' });
    res.status(200).json({ message: 'Activité mise à jour.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour.', error });
  }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const deleted = await activityService.deleteActivity(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Activité non trouvée.' });
    res.status(200).json({ message: 'Activité supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression.', error });
  }
};
