import MouthlyHighlight from '../models/mouthly_highlight.model';

export const createHighlight = async (data: {
  photo: string;
  description: string;
  mouth: string;
  type: string;
  id_school: number;
}) => {
  const highlight = await MouthlyHighlight.create(data);
  return highlight.toJSON();
};

export const getAllBySchool = async (id_school: number) => {
  const highlights = await MouthlyHighlight.findAll({ where: { id_school } });
  return highlights.map((h) => h.toJSON());
};

export const getById = async (id: number) => {
  const highlight = await MouthlyHighlight.findByPk(id);
  return highlight ? highlight.toJSON() : null;
};

export const updateHighlight = async (
  id: number,
  data: Partial<{ photo: string; description: string; mouth: string; type: string }>
) => {
  const [updated] = await MouthlyHighlight.update(data, { where: { id } });
  return updated;
};

export const deleteHighlight = async (id: number) => {
  const deleted = await MouthlyHighlight.destroy({ where: { id } });
  return deleted;
};
