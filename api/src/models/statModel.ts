import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Stat = sequelize.define('Stat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nb_eleves: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nb_apprentis: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nb_stagieres: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nb_formation_continue: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nb_entreprise_partenaire: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    taux_satisf: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    annee: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'stats',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Stat;