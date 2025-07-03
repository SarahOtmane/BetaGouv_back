import Internship from '../models/intership.model';

export const createInternship = async (data: {
  type: string;
  date_debut: Date;
  date_fin: Date;
  id_school: number;
}) => {
  const internship = await Internship.create(data);
  return internship.toJSON();
};

export const getAllBySchool = async (id_school: number) => {
  const internships = await Internship.findAll({ where: { id_school } });
  return internships.map((i) => i.toJSON());
};

export const getById = async (id: number) => {
  const internship = await Internship.findByPk(id);
  return internship ? internship.toJSON() : null;
};

export const updateInternship = async (id: number, data: Partial<{ type: string; date_debut: Date; date_fin: Date }>) => {
  const [updated] = await Internship.update(data, { where: { id } });
  return updated;
};

export const deleteInternship = async (id: number) => {
  const deleted = await Internship.destroy({ where: { id } });
  return deleted;
};
