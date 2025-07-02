import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
  tableName: 'jobs',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default Job;