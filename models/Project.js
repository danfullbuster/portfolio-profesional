const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    technologies: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    projectUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    githubUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'projects',
    timestamps: true
});

module.exports = Project;
