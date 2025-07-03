import Stat from '../models/stat.model';

export const createStat = async (data: {
  nb_eleves?: number;
  nb_apprentis?: number;
  nb_stagieres?: number;
  nb_formation_continue?: number;
  nb_entreprise_partenaire?: number;
  taux_satisf?: number;
  annee?: number;
  id_school: number;
}) => {
  const stat = await Stat.create(data);
  return stat.toJSON();
};

export const getAllBySchool = async (id_school: number) => {
  const stats = await Stat.findAll({ where: { id_school } });
  return stats.map((s) => s.toJSON());
};

export const getById = async (id: number) => {
  const stat = await Stat.findByPk(id);
  return stat ? stat.toJSON() : null;
};

export const updateStat = async (id: number, data: Partial<{
  nb_eleves: number;
  nb_apprentis: number;
  nb_stagieres: number;
  nb_formation_continue: number;
  nb_entreprise_partenaire: number;
  taux_satisf: number;
  annee: number;
}>) => {
  const [updated] = await Stat.update(data, { where: { id } });
  return updated;
};

export const deleteStat = async (id: number) => {
  const deleted = await Stat.destroy({ where: { id } });
  return deleted;
};
