const { sequelize } = require('../config/database');

// Importar todos los modelos
const User = require('./User');
const Project = require('./Project');
const Skill = require('./Skill');
const Experience = require('./Experience');
const Contact = require('./Contact');

// Definir relaciones si es necesario
// Por ejemplo, si quisieras relacionar proyectos con usuarios:
// Project.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Project, { foreignKey: 'userId' });

// Exportar modelos y sequelize
module.exports = {
    sequelize,
    User,
    Project,
    Skill,
    Experience,
    Contact
};
