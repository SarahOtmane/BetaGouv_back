import Adress, { IAdress } from "../models/adress.model";



export const createAdress = async (adressData: {
    rue: string;
    code_postal: string;
    ville: string;
    pays: string;
}) : Promise<IAdress> => {
    const newAdress = await Adress.create(adressData);
    return newAdress.toJSON() as IAdress;
}

export const getAdressById = async (id: number): Promise<IAdress | null> => {
    const adress = await Adress.findByPk(id);
    return adress ? adress.toJSON() as IAdress : null;
}