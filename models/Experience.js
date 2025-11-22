const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    company: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    position: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    current: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'experience',
    timestamps: true,
    validate: {
        endDateAfterStartDate() {
            if (this.endDate && this.startDate && this.endDate < this.startDate) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
        }
    }
});

module.exports = Experience;
