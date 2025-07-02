import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Demande = sequelize.define('Demande', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    id_company: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'demandes',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Demande;