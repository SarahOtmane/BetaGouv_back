import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    SIRET: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    activite_principale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_siege: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
  tableName: 'companies',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Company;