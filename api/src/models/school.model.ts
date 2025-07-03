import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const School = sequelize.define('School', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jobs: {
        // tableaus des id_jobs en db
        type: DataTypes.JSON,
        allowNull: false,
    },
    img_outillage: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    img_plateau: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    img_class_flexible: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    SIRET: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
  tableName: 'schools',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default School;