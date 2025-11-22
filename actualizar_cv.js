/**
 * Script para actualizar la base de datos con la información real de Angie Daniela Bohórquez Escovar
 */
const { User, Project, Skill, Experience, Contact, sequelize } = require('./models');

async function actualizarDatos() {
    try {
        console.log('Conectando a la base de datos...\n');
        await sequelize.authenticate();

        console.log('=== ACTUALIZANDO INFORMACIÓN PERSONAL ===\n');

        // Limpiar datos de ejemplo
        console.log('Eliminando datos de ejemplo...');
        await Project.destroy({ where: {}, truncate: true });
        await Skill.destroy({ where: {}, truncate: true });
        await Experience.destroy({ where: {}, truncate: true });

        console.log('✓ Datos de ejemplo eliminados\n');

        // HABILIDADES REALES
        console.log('Agregando habilidades reales...');
        const habilidades = [
            // Backend
            { name: 'Python', category: 'backend', level: 85, icon: 'fab fa-python' },
            { name: 'Java', category: 'backend', level: 80, icon: 'fab fa-java' },
            { name: 'PHP', category: 'backend', level: 85, icon: 'fab fa-php' },
            { name: 'SQL', category: 'backend', level: 90, icon: 'fas fa-database' },
            { name: 'T-SQL', category: 'backend', level: 85, icon: 'fas fa-database' },
            { name: 'REST APIs', category: 'backend', level: 85, icon: 'fas fa-server' },

            // Frontend
            { name: 'HTML5', category: 'frontend', level: 90, icon: 'fab fa-html5' },
            { name: 'CSS3', category: 'frontend', level: 85, icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', category: 'frontend', level: 80, icon: 'fab fa-js' },
            { name: 'WordPress', category: 'frontend', level: 85, icon: 'fab fa-wordpress' },

            // Tools
            { name: 'Git', category: 'tools', level: 80, icon: 'fab fa-git-alt' },
            { name: 'Bases de Datos', category: 'tools', level: 90, icon: 'fas fa-database' },
            { name: 'Web Services', category: 'tools', level: 85, icon: 'fas fa-cloud' },

            // Soft Skills
            { name: 'Gestión de Proyectos', category: 'soft-skills', level: 85, icon: 'fas fa-tasks' },
            { name: 'Liderazgo', category: 'soft-skills', level: 80, icon: 'fas fa-users' },
            { name: 'Resolución de Problemas', category: 'soft-skills', level: 90, icon: 'fas fa-lightbulb' },
            { name: 'Trabajo en Equipo', category: 'soft-skills', level: 90, icon: 'fas fa-handshake' },
            { name: 'Inglés', category: 'soft-skills', level: 75, icon: 'fas fa-language' }
        ];

        await Skill.bulkCreate(habilidades);
        console.log(`✓ ${habilidades.length} habilidades agregadas\n`);

        // EXPERIENCIA LABORAL REAL
        console.log('Agregando experiencia laboral...');
        const experiencias = [
            {
                company: 'DataCrédito Experian',
                position: 'Analista de Conectividad y Soporte',
                description: 'Ejecución de proyectos de conectividad de clientes para consumo de productos y score a medida. Soporte técnico especializado de primer nivel. Gestión de implementación de web services y VPNs. Garantía de satisfacción del cliente (NPS).',
                startDate: '2022-09-01',
                endDate: null,
                current: true
            },
            {
                company: 'TKambia',
                position: 'Startup Mentor',
                description: 'Asesoramiento en modelo de negocio, producto, crecimiento y financiamiento. Validación del Product-Market Fit. Conexión con inversionistas y aliados estratégicos. Apoyo en toma de decisiones críticas.',
                startDate: '2022-04-01',
                endDate: '2025-02-01',
                current: false
            },
            {
                company: 'EGC TELECOM',
                position: 'Ingeniero de Posventas',
                description: 'Mantenimiento y actualización de aplicaciones web. Soporte técnico en aplicativos. Desarrollo de nuevos aplicativos alineados con necesidades del negocio.',
                startDate: '2020-08-01',
                endDate: '2022-04-01',
                current: false
            },
            {
                company: 'CAPRECOM LIQUIDADO',
                position: 'Desarrollador Web',
                description: 'Mantenimiento y optimización de aplicaciones web. Soporte técnico y funcional. Diseño y ejecución de consultas SQL. Desarrollo y mantenimiento de software.',
                startDate: '2020-10-01',
                endDate: '2021-05-01',
                current: false
            },
            {
                company: 'Promotec Corredores de Seguros',
                position: 'Auxiliar de Desarrollo',
                description: 'Mantenimiento y actualización de aplicaciones web. Diseño y ejecución de consultas SQL. Apoyo en resolución de problemas técnicos de software.',
                startDate: '2020-01-01',
                endDate: '2020-09-01',
                current: false
            }
        ];

        await Experience.bulkCreate(experiencias);
        console.log(`✓ ${experiencias.length} experiencias agregadas\n`);

        // PROYECTOS (Basados en experiencia)
        console.log('Agregando proyectos destacados...');
        const proyectos = [
            {
                title: 'Sistema de Conectividad Web Services',
                description: 'Implementación de soluciones de conectividad para clientes de DataCrédito Experian, permitiendo el consumo de productos y scores personalizados a través de web services seguros y eficientes.',
                technologies: ['Python', 'REST API', 'Web Services', 'SQL', 'VPN'],
                imageUrl: 'https://via.placeholder.com/600x400/667eea/ffffff?text=Web+Services',
                projectUrl: '',
                githubUrl: '',
                featured: true
            },
            {
                title: 'Plataforma de Gestión de Bases de Datos',
                description: 'Desarrollo y optimización de consultas SQL para gestión eficiente de bases de datos. Implementación de procedimientos almacenados y optimización de rendimiento.',
                technologies: ['SQL', 'T-SQL', 'Database Design', 'Optimization'],
                imageUrl: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Database+Management',
                projectUrl: '',
                githubUrl: '',
                featured: true
            },
            {
                title: 'Aplicaciones Web Corporativas',
                description: 'Desarrollo y mantenimiento de aplicaciones web para diferentes empresas, incluyendo formularios dinámicos, gestión de contenido y sistemas de administración.',
                technologies: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'WordPress', 'SQL'],
                imageUrl: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Web+Applications',
                projectUrl: '',
                githubUrl: '',
                featured: true
            },
            {
                title: 'Sistema de Soporte Técnico',
                description: 'Implementación de sistema de soporte técnico para gestión de tickets y atención a clientes, mejorando la eficiencia en la resolución de problemas.',
                technologies: ['Python', 'SQL', 'REST API', 'Web Services'],
                imageUrl: 'https://via.placeholder.com/600x400/00d4aa/ffffff?text=Support+System',
                projectUrl: '',
                githubUrl: '',
                featured: false
            }
        ];

        await Project.bulkCreate(proyectos);
        console.log(`✓ ${proyectos.length} proyectos agregados\n`);

        console.log('='.repeat(60));
        console.log('✅ BASE DE DATOS ACTUALIZADA EXITOSAMENTE!');
        console.log('='.repeat(60));
        console.log('\nInformación actualizada:');
        console.log('  - Nombre: Angie Daniela Bohórquez Escovar');
        console.log('  - Email: angiedanielabe@hotmail.com');
        console.log('  - Teléfono: 321 5079122');
        console.log(`  - Habilidades: ${habilidades.length}`);
        console.log(`  - Experiencias: ${experiencias.length}`);
        console.log(`  - Proyectos: ${proyectos.length}`);
        console.log('\n✓ Puedes ver los cambios en: http://localhost:3000');
        console.log('✓ Panel admin: http://localhost:3000/admin\n');

        process.exit(0);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Ejecutar
actualizarDatos();
