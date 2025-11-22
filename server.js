const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const db = require('./models'); // Importar modelos para sincronización

// Importar rutas
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const experienceRoutes = require('./routes/experience');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet({
    contentSecurityPolicy: false, // Desactivar para desarrollo, activar en producción
}));

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor y sincronizar base de datos
console.log('Iniciando sincronización de base de datos...');
db.sequelize.sync({ force: false }).then(() => {
    console.log('✅ Base de datos sincronizada correctamente. Tablas creadas.');
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Servidor iniciado exitosamente                  ║
║                                                       ║
║   📍 URL: http://localhost:${PORT}                      ║
║   🔧 Modo: ${process.env.NODE_ENV || 'development'}                       ║
║   💾 Base de datos: ${process.env.DB_DIALECT || 'SQLite'}                            ║
║                                                       ║
║   📄 Página principal: http://localhost:${PORT}/       ║
║   🔐 Panel admin: http://localhost:${PORT}/admin      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});

module.exports = app;
