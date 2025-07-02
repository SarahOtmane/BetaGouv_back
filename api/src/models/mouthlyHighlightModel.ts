import { DataTypes } from 'sequelize';
import sequelize from "../config/database";

const MouthlyHighlight = sequelize.define('MouthlyHighlight', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mouth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'mouthlyHighlights',
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

export default MouthlyHighlight;