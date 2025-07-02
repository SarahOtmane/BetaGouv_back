import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'activites',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Activity;