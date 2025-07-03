import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { creerDemande, majStatutDemande } from '../services/demande.service';

export const postDemande = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.role !== 'company') {
      return res.status(403).json({ error: 'Seules les entreprises peuvent créer une demande' });
    }

    const { id_school, action } = req.body;
    const demande = await creerDemande(Number(req.user.id), id_school, action);
    res.status(201).json(demande);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatut = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.role !== 'school') {
      return res.status(403).json({ error: 'Seuls les lycées peuvent modifier le statut' });
    }

    const { statut } = req.body;
    const { id } = req.params;
    const demande = await majStatutDemande(Number(id), statut);
    res.json(demande);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
