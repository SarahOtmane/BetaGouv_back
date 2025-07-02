import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_adress: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default User;