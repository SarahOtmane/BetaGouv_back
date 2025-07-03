import Demande from '../models/demande.model';

export const creerDemande = async (id_company: number, id_school: number, action: any) => {
  return await Demande.create({
    id_company,
    id_school,
    statut: 'en_attente', // par défaut
    action,
  });
};

export const majStatutDemande = async (id: number, statut: string) => {
const demande = await Demande.findByPk(id) as any;
  if (!demande) {
    throw new Error('Demande non trouvée');
  }
  demande.statut = statut;
  await demande.save();
  return demande;
};
