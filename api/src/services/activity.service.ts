import Activity from '../models/activity.model';

export const createActivity = async (data: {
  type: string;
  date: Date;
  id_school: number;
}) => {
  const activity = await Activity.create(data);
  return activity.toJSON();
};

export const getAllActivitiesOfSchool = async (id_school: number) => {
  const activities = await Activity.findAll({where: { id_school }});
  return activities.map((a) => a.toJSON());
};

export const getActivityById = async (id: number) => {
  const activity = await Activity.findByPk(id);
  return activity ? activity.toJSON() : null;
};

export const updateActivity = async (id: number, data: Partial<{ type: string; date: Date }>) => {
  const [updatedRows] = await Activity.update(data, { where: { id } });
  return updatedRows;
};

export const deleteActivity = async (id: number) => {
  const deleted = await Activity.destroy({ where: { id } });
  return deleted;
};
