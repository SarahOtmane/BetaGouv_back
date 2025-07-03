import { Request, Response } from 'express';
import * as companyService from '../services/company.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/user.model';


/* 
    Contrôleur pour la mise à jour des informations de l'entreprise
    - Met à jour les informations de l'entreprise (SIRET, activité principale)
    - Gère la création ou la mise à jour du siège si les informations sont fournies

    le body de la requête doit contenir :
    {
        "SIRET": "12345678900011",
        "activite_principale": "Développement web",
        "siege": {
          "SIRET": "12345678900011",
          "name": "Siege Paris",
          "activite_principale": "Siège administratif",
          "casier_juridique": "SARL"
    }
}
*/

export const updateCompanyInfos = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'company') {
        return res.status(403).json({ error: 'Forbidden: Only company can update' });
    }

    const user = await User.findByPk(req.user.id);

    const { SIRET, activite_principale, siege } = req.body;

    const company = await companyService.getCompanyById(user.getDataValue('id_role'));
    if (!company) return res.status(404).json({ message: 'Entreprise non trouvée.' });

    // 1. Mettre à jour les infos de la company
    await companyService.updateCompany(company.getDataValue('id'), { SIRET, activite_principale });

    // 2. Gérer les infos de siège si fournies
    if (siege) {
      if (company.getDataValue('id_siege')) {
        // Mise à jour du siège existant
        await companyService.updateSiege(company.getDataValue('id_siege'), siege);
      } else {
        // Création d'un nouveau siège
        const newSiege = await companyService.createSiege(siege);
        await companyService.updateCompany(company.getDataValue('id'), { id_siege: newSiege.getDataValue('id') });
      }
    }

    res.status(200).json({ message: 'Entreprise mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’entreprise :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
