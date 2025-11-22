// API Base URL
const API_URL = 'http://localhost:3000/api';

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load theme from localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-bs-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-bs-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        }
    });
});

// Simple AOS (Animate On Scroll) Implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Load Skills
async function loadSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const data = await response.json();

        if (data.success) {
            displaySkills(data.data);
        }
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skillsContainer').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar habilidades</p>
            </div>
        `;
    }
}

function displaySkills(skills) {
    const container = document.getElementById('skillsContainer');

    if (skills.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>No hay habilidades disponibles</p></div>';
        return;
    }

    // Group skills by category
    const categories = {
        'frontend': { name: 'Frontend', icon: 'fas fa-palette', color: 'primary' },
        'backend': { name: 'Backend', icon: 'fas fa-server', color: 'success' },
        'tools': { name: 'Herramientas', icon: 'fas fa-tools', color: 'warning' },
        'soft-skills': { name: 'Soft Skills', icon: 'fas fa-users', color: 'info' }
    };

    let html = '';

    Object.keys(categories).forEach(category => {
        const categorySkills = skills.filter(s => s.category === category);
        if (categorySkills.length > 0) {
            html += `
                <div class="col-12 mb-4">
                    <h4 class="mb-3">
                        <i class="${categories[category].icon} text-${categories[category].color} me-2"></i>
                        ${categories[category].name}
                    </h4>
                    <div class="row g-3">
            `;

            categorySkills.forEach(skill => {
                html += `
                    <div class="col-md-6 col-lg-4">
                        <div class="glass-card skill-card">
                            ${skill.icon ? `<i class="${skill.icon} skill-icon"></i>` : ''}
                            <h5 class="skill-name">${skill.name}</h5>
                            <div class="progress mb-2">
                                <div class="progress-bar" role="progressbar" style="width: ${skill.level}%" 
                                     aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="skill-level mb-0">${skill.level}%</p>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();

        if (data.success) {
            displayProjects(data.data);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar proyectos</p>
            </div>
        `;
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projectsContainer');

    if (projects.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>No hay proyectos disponibles</p></div>';
        return;
    }

    let html = '';

    projects.forEach(project => {
        const technologies = Array.isArray(project.technologies) ? project.technologies : [];

        html += `
            <div class="col-md-6 col-lg-4" data-aos="fade-up">
                <div class="card glass-card project-card">
                    <img src="${project.imageUrl || 'https://via.placeholder.com/600x400'}" 
                         class="card-img-top project-image" alt="${project.title}">
                    <div class="card-body">
                        ${project.featured ? '<span class="badge bg-primary mb-2">Destacado</span>' : ''}
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <div class="mb-3">
                            ${technologies.map(tech => `<span class="badge bg-secondary me-1 mb-1">${tech}</span>`).join('')}
                        </div>
                        <div class="d-flex gap-2">
                            ${project.projectUrl ? `<a href="${project.projectUrl}" target="_blank" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt me-1"></i>Ver</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-sm btn-outline-light"><i class="fab fa-github me-1"></i>Código</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Load Experience
async function loadExperience() {
    try {
        const response = await fetch(`${API_URL}/experience`);
        const data = await response.json();

        if (data.success) {
            console.log('Experiencia cargada:', data.data);
            displayExperience(data.data);
        }
    } catch (error) {
        console.error('Error loading experience:', error);
        document.getElementById('experienceContainer').innerHTML = `
            <div class="text-center">
                <p class="text-danger">Error al cargar experiencia</p>
            </div>
        `;
    }
}

function displayExperience(experiences) {
    const container = document.getElementById('experienceContainer');

    if (experiences.length === 0) {
        container.innerHTML = '<div class="text-center"><p>No hay experiencia disponible</p></div>';
        return;
    }

    let html = '';

    experiences.forEach(exp => {
        const startDate = new Date(exp.startDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
        const endDate = exp.current ? 'Presente' : new Date(exp.endDate).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

        html += `
            <div class="timeline-item" data-aos="fade-up">
                <div class="timeline-date">${startDate} - ${endDate}</div>
                <div class="timeline-company">${exp.company}</div>
                <div class="timeline-position">${exp.position}</div>
                <p class="mb-0">${exp.description || ''}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const contactAlert = document.getElementById('contactAlert');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            contactAlert.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="fas fa-check-circle me-2"></i>¡Mensaje enviado exitosamente! Te contactaré pronto.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            contactForm.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        contactAlert.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>Error al enviar el mensaje. Por favor intenta nuevamente.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
    // loadExperience(); // Comentado para usar contenido estático HTML
});
