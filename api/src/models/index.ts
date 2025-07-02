import Activity from "./activityModel";
import Adress from "./adressModel";
import Company from "./companyModel";
import Demande from "./demandeModel";
import Internship from "./intershipModel";
import MouthlyHighlight from "./mouthlyHighlightModel";
import School from "./schoolModel";
import Siege from "./siegeModel";
import Stat from "./statModel";
import User from "./userModel";

User.belongsTo(Company, { foreignKey: 'id_role' });
Company.hasMany(User, { foreignKey: 'id_role' });

User.belongsTo(School, { foreignKey: 'id_role' });
School.hasMany(User, { foreignKey: 'id_role' });

User.belongsTo(Adress, { foreignKey: 'id_adress' });
Adress.hasMany(User, { foreignKey: 'id_adress' });

Stat.belongsTo(School, { foreignKey: 'id_school' });
School.hasMany(Stat, { foreignKey: 'id_school' });

Activity.belongsTo(School, { foreignKey: 'id_school' });
School.hasMany(Activity, { foreignKey: 'id_school' });

Internship.belongsTo(School, { foreignKey: 'id_school' });
School.hasMany(Internship, { foreignKey: 'id_school' });

Company.belongsTo(Siege, { foreignKey: 'id_siege' });
Siege.hasMany(Company, { foreignKey: 'id_siege' });

MouthlyHighlight.belongsTo(School, { foreignKey: 'id_school' });
School.hasMany(MouthlyHighlight, { foreignKey: 'id_school' });

Demande.belongsTo(Company, { foreignKey: 'id_company' });
Company.hasMany(Demande, { foreignKey: 'id_company' });

Demande.belongsTo(School, { foreignKey: 'id_school' });
School.hasMany(Demande, { foreignKey: 'id_school' });