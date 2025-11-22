const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Base de datos en archivo local
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false
  }
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexión a SQLite establecida correctamente.');
  } catch (error) {
    console.error('✗ Error al conectar a SQLite:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };
