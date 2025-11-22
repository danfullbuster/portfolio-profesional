const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
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
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    subject: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'contacts',
    timestamps: true
});

module.exports = Contact;
