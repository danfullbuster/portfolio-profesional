const { sequelize, User, Project, Skill, Experience, Contact } = require('../models');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        console.log('🔄 Iniciando sincronización de base de datos...\n');

        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: true }); // force: true elimina y recrea las tablas
        console.log('✓ Tablas creadas exitosamente\n');

        // Crear usuario administrador
        console.log('👤 Creando usuario administrador...');
        const admin = await User.create({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@micv.com',
            password: process.env.ADMIN_PASSWORD || 'Admin123!'
        });
        console.log('✓ Usuario administrador creado\n');

        // Crear habilidades de ejemplo
        console.log('💡 Creando habilidades de ejemplo...');
        await Skill.bulkCreate([
            { name: 'HTML5', category: 'frontend', level: 90, icon: 'fab fa-html5' },
            { name: 'CSS3', category: 'frontend', level: 85, icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', category: 'frontend', level: 80, icon: 'fab fa-js' },
            { name: 'Bootstrap', category: 'frontend', level: 85, icon: 'fab fa-bootstrap' },
            { name: 'React', category: 'frontend', level: 75, icon: 'fab fa-react' },
            { name: 'Node.js', category: 'backend', level: 80, icon: 'fab fa-node-js' },
            { name: 'Express', category: 'backend', level: 75, icon: 'fas fa-server' },
            { name: 'MySQL', category: 'backend', level: 70, icon: 'fas fa-database' },
            { name: 'Git', category: 'tools', level: 85, icon: 'fab fa-git-alt' },
            { name: 'GitHub', category: 'tools', level: 85, icon: 'fab fa-github' },
            { name: 'Trabajo en equipo', category: 'soft-skills', level: 90, icon: 'fas fa-users' },
            { name: 'Resolución de problemas', category: 'soft-skills', level: 85, icon: 'fas fa-lightbulb' }
        ]);
        console.log('✓ Habilidades creadas\n');

        // Crear proyectos de ejemplo
        console.log('📁 Creando proyectos de ejemplo...');
        await Project.bulkCreate([
            {
                title: 'Portfolio Personal',
                description: 'Página web de presentación profesional con panel de administrador, desarrollada con HTML, CSS, JavaScript y Bootstrap. Backend con Node.js, Express y MySQL.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Node.js', 'Express', 'MySQL'],
                imageUrl: 'https://via.placeholder.com/600x400/667eea/ffffff?text=Portfolio',
                projectUrl: 'http://localhost:3000',
                githubUrl: 'https://github.com/usuario/portfolio',
                featured: true
            },
            {
                title: 'Sistema de Gestión',
                description: 'Aplicación web para gestión de inventario con autenticación de usuarios y reportes en tiempo real.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
                imageUrl: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Sistema+Gestion',
                projectUrl: '',
                githubUrl: 'https://github.com/usuario/sistema-gestion',
                featured: false
            },
            {
                title: 'E-commerce',
                description: 'Tienda online con carrito de compras, pasarela de pagos y panel de administración.',
                technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
                imageUrl: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=E-commerce',
                projectUrl: '',
                githubUrl: 'https://github.com/usuario/ecommerce',
                featured: true
            }
        ]);
        console.log('✓ Proyectos creados\n');

        // Crear experiencia de ejemplo
        console.log('💼 Creando experiencia laboral de ejemplo...');
        await Experience.bulkCreate([
            {
                company: 'Tech Solutions',
                position: 'Desarrolladora Frontend Jr',
                description: 'Desarrollo de interfaces de usuario con React y Vue.js. Colaboración en equipo usando metodologías ágiles.',
                startDate: '2023-01-15',
                endDate: null,
                current: true
            },
            {
                company: 'StartUp Innovadora',
                position: 'Practicante de Desarrollo Web',
                description: 'Desarrollo de páginas web responsivas con HTML, CSS y JavaScript. Mantenimiento de sitios web existentes.',
                startDate: '2022-06-01',
                endDate: '2022-12-31',
                current: false
            }
        ]);
        console.log('✓ Experiencia creada\n');

        // Crear mensaje de contacto de ejemplo
        console.log('📧 Creando mensaje de contacto de ejemplo...');
        await Contact.create({
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            subject: 'Consulta sobre colaboración',
            message: 'Hola, me gustaría saber más sobre tus servicios de desarrollo web.',
            read: false
        });
        console.log('✓ Mensaje de contacto creado\n');

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Base de datos inicializada exitosamente!');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log('🔐 CREDENCIALES DE ADMINISTRADOR:');
        console.log('───────────────────────────────────────────────────────');
        console.log(`   Usuario:     ${admin.username}`);
        console.log(`   Email:       ${admin.email}`);
        console.log(`   Contraseña:  ${process.env.ADMIN_PASSWORD || 'Admin123!'}`);
        console.log('───────────────────────────────────────────────────────');
        console.log('\n⚠️  IMPORTANTE: Cambia la contraseña después del primer acceso\n');
        console.log('🚀 Puedes iniciar el servidor con: npm run dev\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();
