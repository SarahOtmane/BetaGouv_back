import Activity from "../models/activityModel";
import Adress from "../models/adressModel";
import Company from "../models/companyModel";
import Demande from "../models/demandeModel";
import Internship from "../models/intershipModel";
import Job from "../models/jobsModel";
import MouthlyHighlight from "../models/mouthlyHighlightModel";
import School from "../models/schoolModel";
import Siege from "../models/siegeModel";
import Stat from "../models/statModel";
import User from "../models/userModel";

const models = [
    User,
    Company,
    School,
    Adress,
    Stat,
    Activity,
    Internship,
    Siege,
    MouthlyHighlight,
    Demande,
    Job
];

export const createTablesInOrder = async (): Promise<void> => {
    try {
        for (const model of models) {
            await model.sync({ alter: true, force: false });
        }
        console.log('Tables créées');
    } catch (error) {
        console.error('Erreur lors de la création des tables :', error);
    }
};
