import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Internship = sequelize.define('Internship', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_debut: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_lycee: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'internships',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Internship;