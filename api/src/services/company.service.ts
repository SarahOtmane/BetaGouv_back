import Company from '../models/company.model';
import Siege from '../models/siege.model';

export const getCompanyById = async (id: number) => {
  const company = await Company.findByPk(id);
  return company;
};

export const updateCompany = async (id: number, data: Partial<{ SIRET: string; activite_principale: string; id_siege: number }>) => {
  return await Company.update(data, { where: { id } });
};

export const createSiege = async (data: {
  SIRET: string;
  name: string;
  activite_principale: string;
  casier_juridique: string;
}) => {
  const siege = await Siege.create(data);
  return siege;
};

export const updateSiege = async (id: number, data: Partial<{
  SIRET: string;
  name: string;
  activite_principale: string;
  casier_juridique: string;
}>) => {
  return await Siege.update(data, { where: { id } });
};
