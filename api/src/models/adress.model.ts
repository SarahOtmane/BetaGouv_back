import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

export interface IAdress {
    id?: number;
    rue: string;
    code_postal: string;
    ville: string;
    pays: string;
}

const Adress = sequelize.define('Adress', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rue: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code_postal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pays: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
  tableName: 'adresses',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Adress;