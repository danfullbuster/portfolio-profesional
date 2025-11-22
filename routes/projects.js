const express = require('express');
const router = express.Router();
const { Project } = require('../models');
const authMiddleware = require('../middleware/auth');

// GET /api/projects - Listar todos los proyectos (público)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll({
            order: [['featured', 'DESC'], ['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: projects
        });
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener proyectos'
        });
    }
});

// GET /api/projects/:id - Obtener un proyecto específico (público)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error al obtener proyecto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener proyecto'
        });
    }
});

// POST /api/projects - Crear proyecto (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, technologies, imageUrl, projectUrl, githubUrl, featured } = req.body;

        const project = await Project.create({
            title,
            description,
            technologies,
            imageUrl,
            projectUrl,
            githubUrl,
            featured: featured || false
        });

        res.status(201).json({
            success: true,
            message: 'Proyecto creado exitosamente',
            data: project
        });
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear proyecto',
            error: error.message
        });
    }
});

// PUT /api/projects/:id - Actualizar proyecto (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        const { title, description, technologies, imageUrl, projectUrl, githubUrl, featured } = req.body;

        await project.update({
            title,
            description,
            technologies,
            imageUrl,
            projectUrl,
            githubUrl,
            featured
        });

        res.json({
            success: true,
            message: 'Proyecto actualizado exitosamente',
            data: project
        });
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar proyecto',
            error: error.message
        });
    }
});

// DELETE /api/projects/:id - Eliminar proyecto (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        await project.destroy();

        res.json({
            success: true,
            message: 'Proyecto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar proyecto'
        });
    }
});

module.exports = router;
