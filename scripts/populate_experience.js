const { sequelize } = require('../config/database');
const Experience = require('../models/Experience');

const experiences = [
    {
        company: 'DataCrédito Experian',
        position: 'Analista de conectividad y soporte',
        description: 'Ejecutar los proyectos de conectividad de clientes para el consumo de productos existentes y score a la medida a través de web services. Brindar el soporte técnico especializado de primer nivel a los clientes para la implementación del web services. Prestar soporte técnico y funcional a los clientes ante la disponibilidad de los entornos previos. Apoyar la gestión con equipos técnicos para la implementación de nuevos canales dedicados, VPNs y modificaciones a conexiones existentes. Garantizar la satisfacción de nuestros clientes (NPS).',
        startDate: '2022-09-01',
        current: true
    },
    {
        company: 'TKambia',
        position: 'Startup Mentor',
        description: 'Brindar asesoramiento en modelo de negocio, producto, crecimiento y financiamiento. Ayudar en la definición y validación del Product-Market Fit. Conectar con inversionistas, aliados estratégicos y redes de contacto. Apoyar en la toma de decisiones críticas y solución de problemas. Motivar y desafiar a los emprendedores para maximizar su potencial.',
        startDate: '2022-04-01',
        endDate: '2025-02-01',
        current: false
    },
    {
        company: 'EGC TELECOM',
        position: 'Ingeniero de posventas',
        description: 'Mantenimiento y actualización de aplicaciones web según los requerimientos establecidos. Soporte técnico en los diferentes aplicativos, garantizando una atención eficiente y oportuna. Desarrollo de nuevos aplicativos, alineados con las necesidades del negocio y los clientes.',
        startDate: '2020-08-01',
        endDate: '2022-04-01',
        current: false
    },
    {
        company: 'CAPRECOM LIQUIDADO',
        position: 'Desarrollador web',
        description: 'Mantenimiento y optimización de aplicaciones web. Soporte técnico y funcional a diferentes áreas. Atención y resolución de consultas de usuarios internos y clientes. Diseño y ejecución de consultas SQL. Diagnóstico y solución de problemas técnicos. Desarrollo y mantenimiento de software.',
        startDate: '2020-10-01',
        endDate: '2021-05-01',
        current: false
    },
    {
        company: 'Promotec corredores de seguros',
        position: 'Auxiliar de desarrollo',
        description: 'Mantenimiento y actualización de aplicaciones web. Diseño y ejecución de consultas SQL para la optimización de bases de datos. Apoyo en la resolución de problemas técnicos de software. Ejecutar cambios solicitados y realizar mantenimiento a los proyectos de software.',
        startDate: '2020-01-01',
        endDate: '2020-09-01',
        current: false
    }
];

async function populateExperience() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // Sincronizar modelo (esto creará la tabla si no existe)
        await Experience.sync();

        // Limpiar experiencias existentes para evitar duplicados
        await Experience.destroy({ where: {}, truncate: true });
        console.log('Experiencias anteriores eliminadas.');

        // Insertar nuevas experiencias
        for (const exp of experiences) {
            await Experience.create(exp);
            console.log(`Experiencia agregada: ${exp.position} en ${exp.company}`);
        }

        console.log('¡Todas las experiencias han sido agregadas exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar experiencias:', error);
        process.exit(1);
    }
}

populateExperience();
