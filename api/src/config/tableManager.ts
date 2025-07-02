import Activity from "../models/activity.model";
import Adress from "../models/adress.model";
import Company from "../models/company.model";
import Demande from "../models/demande.model";
import Internship from "../models/intership.model";
import Job from "../models/job.model";
import MouthlyHighlight from "../models/mouthly_highlight.model";
import School from "../models/school.model";
import Siege from "../models/siege.model";
import Stat from "../models/stat.model";
import User from "../models/user.model";

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
