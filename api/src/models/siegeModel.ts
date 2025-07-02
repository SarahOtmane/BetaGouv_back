import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Siege = sequelize.define('Siege', {
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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activite_principale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    casier_juridique: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
  tableName: 'sieges',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Siege;