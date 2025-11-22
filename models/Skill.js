const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.ENUM('frontend', 'backend', 'tools', 'soft-skills'),
        allowNull: false,
        defaultValue: 'tools'
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
        validate: {
            min: 1,
            max: 100
        }
    },
    icon: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Nombre del icono o clase CSS'
    }
}, {
    tableName: 'skills',
    timestamps: true
});

module.exports = Skill;
