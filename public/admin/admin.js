// API Base URL
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');
const logoutBtn = document.getElementById('logoutBtn');
const adminUsername = document.getElementById('adminUsername');

// Check if user is logged in
let token = localStorage.getItem('adminToken');
let currentUser = null;

if (token) {
    showDashboard();
} else {
    showLogin();
}

// Login Form Submit
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('adminToken', token);
            showDashboard();
        } else {
            showAlert(loginAlert, 'danger', data.message || 'Credenciales inválidas');
        }
    } catch (error) {
        showAlert(loginAlert, 'danger', 'Error al conectar con el servidor');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    token = null;
    currentUser = null;
    showLogin();
});

function showLogin() {
    loginScreen.classList.remove('d-none');
    dashboard.classList.add('d-none');
}

function showDashboard() {
    loginScreen.classList.add('d-none');
    dashboard.classList.remove('d-none');
    if (currentUser) {
        adminUsername.textContent = currentUser.username;
    }
    loadProjects();
}

// Section Navigation
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;

        // Update active state
        document.querySelectorAll('.list-group-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Show section
        document.querySelectorAll('.content-section').forEach(s => s.classList.add('d-none'));
        document.getElementById(`${section}Section`).classList.remove('d-none');

        // Load data
        switch (section) {
            case 'projects':
                loadProjects();
                break;
            case 'skills':
                loadSkills();
                break;
            case 'experience':
                loadExperience();
                break;
            case 'contacts':
                loadContacts();
                break;
        }
    });
});

// Helper function to show alerts
function showAlert(container, type, message) {
    container.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// API Helper with Auth
async function apiRequest(url, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        showLogin();
        throw new Error('Sesión expirada');
    }

    return data;
}

// ========== PROJECTS ==========
async function loadProjects() {
    try {
        const data = await apiRequest(`${API_URL}/projects`);
        displayProjects(data.data);
    } catch (error) {
        document.getElementById('projectsList').innerHTML = '<p class="text-danger">Error al cargar proyectos</p>';
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projectsList');

    if (projects.length === 0) {
        container.innerHTML = '<p>No hay proyectos</p>';
        return;
    }

    let html = `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Tecnologías</th>
                    <th>Destacado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    projects.forEach(project => {
        const techs = Array.isArray(project.technologies) ? project.technologies.slice(0, 3).join(', ') : '';
        html += `
            <tr>
                <td>${project.title}</td>
                <td>${techs}</td>
                <td>${project.featured ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-secondary">No</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProject('${project.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function openProjectModal(project = null) {
    document.getElementById('projectId').value = project ? project.id : '';
    document.getElementById('projectTitle').value = project ? project.title : '';
    document.getElementById('projectDescription').value = project ? project.description : '';
    document.getElementById('projectTechnologies').value = project && Array.isArray(project.technologies) ? project.technologies.join(', ') : '';
    document.getElementById('projectImage').value = project ? project.imageUrl || '' : '';
    document.getElementById('projectUrl').value = project ? project.projectUrl || '' : '';
    document.getElementById('projectGithub').value = project ? project.githubUrl || '' : '';
    document.getElementById('projectFeatured').checked = project ? project.featured : false;
    document.getElementById('projectModalTitle').textContent = project ? 'Editar Proyecto' : 'Nuevo Proyecto';
}

async function editProject(id) {
    try {
        const data = await apiRequest(`${API_URL}/projects/${id}`);
        openProjectModal(data.data);
        new bootstrap.Modal(document.getElementById('projectModal')).show();
    } catch (error) {
        alert('Error al cargar proyecto');
    }
}

async function saveProject() {
    const id = document.getElementById('projectId').value;
    const technologies = document.getElementById('projectTechnologies').value
        .split(',')
        .map(t => t.trim())
        .filter(t => t);

    const projectData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        technologies,
        imageUrl: document.getElementById('projectImage').value,
        projectUrl: document.getElementById('projectUrl').value,
        githubUrl: document.getElementById('projectGithub').value,
        featured: document.getElementById('projectFeatured').checked
    };

    try {
        if (id) {
            await apiRequest(`${API_URL}/projects/${id}`, 'PUT', projectData);
        } else {
            await apiRequest(`${API_URL}/projects`, 'POST', projectData);
        }

        bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
        loadProjects();
    } catch (error) {
        alert('Error al guardar proyecto');
    }
}

async function deleteProject(id) {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
        await apiRequest(`${API_URL}/projects/${id}`, 'DELETE');
        loadProjects();
    } catch (error) {
        alert('Error al eliminar proyecto');
    }
}

// ========== SKILLS ==========
async function loadSkills() {
    try {
        const data = await apiRequest(`${API_URL}/skills`);
        displaySkills(data.data);
    } catch (error) {
        document.getElementById('skillsList').innerHTML = '<p class="text-danger">Error al cargar habilidades</p>';
    }
}

function displaySkills(skills) {
    const container = document.getElementById('skillsList');

    if (skills.length === 0) {
        container.innerHTML = '<p>No hay habilidades</p>';
        return;
    }

    let html = `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Nivel</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    skills.forEach(skill => {
        html += `
            <tr>
                <td><i class="${skill.icon || 'fas fa-code'} me-2"></i>${skill.name}</td>
                <td><span class="badge bg-info">${skill.category}</span></td>
                <td>${skill.level}%</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editSkill('${skill.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSkill('${skill.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function openSkillModal(skill = null) {
    document.getElementById('skillId').value = skill ? skill.id : '';
    document.getElementById('skillName').value = skill ? skill.name : '';
    document.getElementById('skillCategory').value = skill ? skill.category : 'frontend';
    document.getElementById('skillLevel').value = skill ? skill.level : 50;
    document.getElementById('skillIcon').value = skill ? skill.icon || '' : '';
    document.getElementById('skillModalTitle').textContent = skill ? 'Editar Habilidad' : 'Nueva Habilidad';
}

async function editSkill(id) {
    try {
        const data = await apiRequest(`${API_URL}/skills`);
        const skill = data.data.find(s => s.id === id);
        openSkillModal(skill);
        new bootstrap.Modal(document.getElementById('skillModal')).show();
    } catch (error) {
        alert('Error al cargar habilidad');
    }
}

async function saveSkill() {
    const id = document.getElementById('skillId').value;
    const skillData = {
        name: document.getElementById('skillName').value,
        category: document.getElementById('skillCategory').value,
        level: parseInt(document.getElementById('skillLevel').value),
        icon: document.getElementById('skillIcon').value
    };

    try {
        if (id) {
            await apiRequest(`${API_URL}/skills/${id}`, 'PUT', skillData);
        } else {
            await apiRequest(`${API_URL}/skills`, 'POST', skillData);
        }

        bootstrap.Modal.getInstance(document.getElementById('skillModal')).hide();
        loadSkills();
    } catch (error) {
        alert('Error al guardar habilidad');
    }
}

async function deleteSkill(id) {
    if (!confirm('¿Estás seguro de eliminar esta habilidad?')) return;

    try {
        await apiRequest(`${API_URL}/skills/${id}`, 'DELETE');
        loadSkills();
    } catch (error) {
        alert('Error al eliminar habilidad');
    }
}

// ========== EXPERIENCE ==========
async function loadExperience() {
    try {
        const data = await apiRequest(`${API_URL}/experience`);
        displayExperience(data.data);
    } catch (error) {
        document.getElementById('experienceList').innerHTML = '<p class="text-danger">Error al cargar experiencia</p>';
    }
}

function displayExperience(experiences) {
    const container = document.getElementById('experienceList');

    if (experiences.length === 0) {
        container.innerHTML = '<p>No hay experiencia</p>';
        return;
    }

    let html = `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Empresa</th>
                    <th>Cargo</th>
                    <th>Período</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    experiences.forEach(exp => {
        const startDate = new Date(exp.startDate).toLocaleDateString('es-ES');
        const endDate = exp.current ? 'Presente' : new Date(exp.endDate).toLocaleDateString('es-ES');

        html += `
            <tr>
                <td>${exp.company}</td>
                <td>${exp.position}</td>
                <td>${startDate} - ${endDate}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editExperience('${exp.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExperience('${exp.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function openExperienceModal(experience = null) {
    document.getElementById('experienceId').value = experience ? experience.id : '';
    document.getElementById('experienceCompany').value = experience ? experience.company : '';
    document.getElementById('experiencePosition').value = experience ? experience.position : '';
    document.getElementById('experienceDescription').value = experience ? experience.description || '' : '';
    document.getElementById('experienceStartDate').value = experience ? experience.startDate : '';
    document.getElementById('experienceEndDate').value = experience && !experience.current ? experience.endDate : '';
    document.getElementById('experienceCurrent').checked = experience ? experience.current : false;
    document.getElementById('experienceModalTitle').textContent = experience ? 'Editar Experiencia' : 'Nueva Experiencia';
    toggleEndDate();
}

function toggleEndDate() {
    const current = document.getElementById('experienceCurrent').checked;
    const endDateInput = document.getElementById('experienceEndDate');
    endDateInput.disabled = current;
    if (current) endDateInput.value = '';
}

async function editExperience(id) {
    try {
        const data = await apiRequest(`${API_URL}/experience`);
        const experience = data.data.find(e => e.id === id);
        openExperienceModal(experience);
        new bootstrap.Modal(document.getElementById('experienceModal')).show();
    } catch (error) {
        alert('Error al cargar experiencia');
    }
}

async function saveExperience() {
    const id = document.getElementById('experienceId').value;
    const current = document.getElementById('experienceCurrent').checked;

    const experienceData = {
        company: document.getElementById('experienceCompany').value,
        position: document.getElementById('experiencePosition').value,
        description: document.getElementById('experienceDescription').value,
        startDate: document.getElementById('experienceStartDate').value,
        endDate: current ? null : document.getElementById('experienceEndDate').value,
        current
    };

    try {
        if (id) {
            await apiRequest(`${API_URL}/experience/${id}`, 'PUT', experienceData);
        } else {
            await apiRequest(`${API_URL}/experience`, 'POST', experienceData);
        }

        bootstrap.Modal.getInstance(document.getElementById('experienceModal')).hide();
        loadExperience();
    } catch (error) {
        alert('Error al guardar experiencia');
    }
}

async function deleteExperience(id) {
    if (!confirm('¿Estás seguro de eliminar esta experiencia?')) return;

    try {
        await apiRequest(`${API_URL}/experience/${id}`, 'DELETE');
        loadExperience();
    } catch (error) {
        alert('Error al eliminar experiencia');
    }
}

// ========== CONTACTS ==========
async function loadContacts() {
    try {
        const data = await apiRequest(`${API_URL}/contact`);
        displayContacts(data.data);
    } catch (error) {
        document.getElementById('contactsList').innerHTML = '<p class="text-danger">Error al cargar mensajes</p>';
    }
}

function displayContacts(contacts) {
    const container = document.getElementById('contactsList');

    if (contacts.length === 0) {
        container.innerHTML = '<p>No hay mensajes</p>';
        return;
    }

    let html = `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Asunto</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    contacts.forEach(contact => {
        const date = new Date(contact.createdAt).toLocaleDateString('es-ES');

        html += `
            <tr class="${contact.read ? '' : 'table-primary'}">
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.subject}</td>
                <td>${date}</td>
                <td>${contact.read ? '<span class="badge bg-secondary">Leído</span>' : '<span class="badge bg-primary">Nuevo</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewContact('${contact.id}', \`${contact.message.replace(/`/g, '\\`')}\`)">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${!contact.read ? `<button class="btn btn-sm btn-success" onclick="markAsRead('${contact.id}')"><i class="fas fa-check"></i></button>` : ''}
                    <button class="btn btn-sm btn-danger" onclick="deleteContact('${contact.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function viewContact(id, message) {
    alert(`Mensaje:\n\n${message}`);
    markAsRead(id);
}

async function markAsRead(id) {
    try {
        await apiRequest(`${API_URL}/contact/${id}/read`, 'PUT');
        loadContacts();
    } catch (error) {
        console.error('Error al marcar como leído');
    }
}

async function deleteContact(id) {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
        await apiRequest(`${API_URL}/contact/${id}`, 'DELETE');
        loadContacts();
    } catch (error) {
        alert('Error al eliminar mensaje');
    }
}
