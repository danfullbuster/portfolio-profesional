"""
Script para actualizar la base de datos con la información real de Angie Daniela Bohórquez Escovar
"""
from models import sequelize, User, Project, Skill, Experience, Contact
import asyncio

async def actualizar_datos():
    try:
        print("Conectando a la base de datos...")
        await sequelize.authenticate()
        
        print("\n=== ACTUALIZANDO INFORMACIÓN PERSONAL ===\n")
        
        # Limpiar datos de ejemplo
        print("Eliminando datos de ejemplo...")
        await Project.destroy({ 'where': {}, 'truncate': True })
        await Skill.destroy({ 'where': {}, 'truncate': True })
        await Experience.destroy({ 'where': {}, 'truncate': True })
        
        print("✓ Datos de ejemplo eliminados\n")
        
        # HABILIDADES REALES
        print("Agregando habilidades reales...")
        habilidades = [
            # Backend
            { 'name': 'Python', 'category': 'backend', 'level': 85, 'icon': 'fab fa-python' },
            { 'name': 'Java', 'category': 'backend', 'level': 80, 'icon': 'fab fa-java' },
            { 'name': 'PHP', 'category': 'backend', 'level': 85, 'icon': 'fab fa-php' },
            { 'name': 'SQL', 'category': 'backend', 'level': 90, 'icon': 'fas fa-database' },
            { 'name': 'T-SQL', 'category': 'backend', 'level': 85, 'icon': 'fas fa-database' },
            { 'name': 'REST APIs', 'category': 'backend', 'level': 85, 'icon': 'fas fa-server' },
            
            # Frontend
            { 'name': 'HTML5', 'category': 'frontend', 'level': 90, 'icon': 'fab fa-html5' },
            { 'name': 'CSS3', 'category': 'frontend', 'level': 85, 'icon': 'fab fa-css3-alt' },
            { 'name': 'JavaScript', 'category': 'frontend', 'level': 80, 'icon': 'fab fa-js' },
            { 'name': 'WordPress', 'category': 'frontend', 'level': 85, 'icon': 'fab fa-wordpress' },
            
            # Tools
            { 'name': 'Git', 'category': 'tools', 'level': 80, 'icon': 'fab fa-git-alt' },
            { 'name': 'Bases de Datos', 'category': 'tools', 'level': 90, 'icon': 'fas fa-database' },
            { 'name': 'Web Services', 'category': 'tools', 'level': 85, 'icon': 'fas fa-cloud' },
            
            # Soft Skills
            { 'name': 'Gestión de Proyectos', 'category': 'soft-skills', 'level': 85, 'icon': 'fas fa-tasks' },
            { 'name': 'Liderazgo', 'category': 'soft-skills', 'level': 80, 'icon': 'fas fa-users' },
            { 'name': 'Resolución de Problemas', 'category': 'soft-skills', 'level': 90, 'icon': 'fas fa-lightbulb' },
            { 'name': 'Trabajo en Equipo', 'category': 'soft-skills', 'level': 90, 'icon': 'fas fa-handshake' },
            { 'name': 'Inglés', 'category': 'soft-skills', 'level': 75, 'icon': 'fas fa-language' }
        ]
        
        for skill in habilidades:
            await Skill.create(skill)
        
        print(f"✓ {len(habilidades)} habilidades agregadas\n")
        
        # EXPERIENCIA LABORAL REAL
        print("Agregando experiencia laboral...")
        experiencias = [
            {
                'company': 'DataCrédito Experian',
                'position': 'Analista de Conectividad y Soporte',
                'description': 'Ejecución de proyectos de conectividad de clientes para consumo de productos y score a medida. Soporte técnico especializado de primer nivel. Gestión de implementación de web services y VPNs. Garantía de satisfacción del cliente (NPS).',
                'startDate': '2022-09-01',
                'endDate': None,
                'current': True
            },
            {
                'company': 'TKambia',
                'position': 'Startup Mentor',
                'description': 'Asesoramiento en modelo de negocio, producto, crecimiento y financiamiento. Validación del Product-Market Fit. Conexión con inversionistas y aliados estratégicos. Apoyo en toma de decisiones críticas.',
                'startDate': '2022-04-01',
                'endDate': '2025-02-01',
                'current': False
            },
            {
                'company': 'EGC TELECOM',
                'position': 'Ingeniero de Posventas',
                'description': 'Mantenimiento y actualización de aplicaciones web. Soporte técnico en aplicativos. Desarrollo de nuevos aplicativos alineados con necesidades del negocio.',
                'startDate': '2020-08-01',
                'endDate': '2022-04-01',
                'current': False
            },
            {
                'company': 'CAPRECOM LIQUIDADO',
                'position': 'Desarrollador Web',
                'description': 'Mantenimiento y optimización de aplicaciones web. Soporte técnico y funcional. Diseño y ejecución de consultas SQL. Desarrollo y mantenimiento de software.',
                'startDate': '2020-10-01',
                'endDate': '2021-05-01',
                'current': False
            },
            {
                'company': 'Promotec Corredores de Seguros',
                'position': 'Auxiliar de Desarrollo',
                'description': 'Mantenimiento y actualización de aplicaciones web. Diseño y ejecución de consultas SQL. Apoyo en resolución de problemas técnicos de software.',
                'startDate': '2020-01-01',
                'endDate': '2020-09-01',
                'current': False
            }
        ]
        
        for exp in experiencias:
            await Experience.create(exp)
        
        print(f"✓ {len(experiencias)} experiencias agregadas\n")
        
        # PROYECTOS (Basados en experiencia)
        print("Agregando proyectos destacados...")
        proyectos = [
            {
                'title': 'Sistema de Conectividad Web Services',
                'description': 'Implementación de soluciones de conectividad para clientes de DataCrédito Experian, permitiendo el consumo de productos y scores personalizados a través de web services seguros y eficientes.',
                'technologies': ['Python', 'REST API', 'Web Services', 'SQL', 'VPN'],
                'imageUrl': 'https://via.placeholder.com/600x400/667eea/ffffff?text=Web+Services',
                'projectUrl': '',
                'githubUrl': '',
                'featured': True
            },
            {
                'title': 'Plataforma de Gestión de Bases de Datos',
                'description': 'Desarrollo y optimización de consultas SQL para gestión eficiente de bases de datos. Implementación de procedimientos almacenados y optimización de rendimiento.',
                'technologies': ['SQL', 'T-SQL', 'Database Design', 'Optimization'],
                'imageUrl': 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Database+Management',
                'projectUrl': '',
                'githubUrl': '',
                'featured': True
            },
            {
                'title': 'Aplicaciones Web Corporativas',
                'description': 'Desarrollo y mantenimiento de aplicaciones web para diferentes empresas, incluyendo formularios dinámicos, gestión de contenido y sistemas de administración.',
                'technologies': ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'WordPress', 'SQL'],
                'imageUrl': 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Web+Applications',
                'projectUrl': '',
                'githubUrl': '',
                'featured': True
            },
            {
                'title': 'Sistema de Soporte Técnico',
                'description': 'Implementación de sistema de soporte técnico para gestión de tickets y atención a clientes, mejorando la eficiencia en la resolución de problemas.',
                'technologies': ['Python', 'SQL', 'REST API', 'Web Services'],
                'imageUrl': 'https://via.placeholder.com/600x400/00d4aa/ffffff?text=Support+System',
                'projectUrl': '',
                'githubUrl': '',
                'featured': False
            }
        ]
        
        for proyecto in proyectos:
            await Project.create(proyecto)
        
        print(f"✓ {len(proyectos)} proyectos agregados\n")
        
        print("=" * 60)
        print("✅ BASE DE DATOS ACTUALIZADA EXITOSAMENTE!")
        print("=" * 60)
        print("\nInformación actualizada:")
        print(f"  - Nombre: Angie Daniela Bohórquez Escovar")
        print(f"  - Email: angiedanielabe@hotmail.com")
        print(f"  - Teléfono: 321 5079122")
        print(f"  - Habilidades: {len(habilidades)}")
        print(f"  - Experiencias: {len(experiencias)}")
        print(f"  - Proyectos: {len(proyectos)}")
        print("\n✓ Puedes ver los cambios en: http://localhost:3000")
        print("✓ Panel admin: http://localhost:3000/admin")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

# Ejecutar
if __name__ == "__main__":
    asyncio.run(actualizar_datos())
