const express = require('express');
const router = express.Router();
const { Experience } = require('../models');
const authMiddleware = require('../middleware/auth');

// GET /api/experience - Listar experiencia laboral (público)
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.findAll({
            order: [['startDate', 'DESC']]
        });

        res.json({
            success: true,
            data: experiences
        });
    } catch (error) {
        console.error('Error al obtener experiencia:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener experiencia'
        });
    }
});

// POST /api/experience - Crear experiencia (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { company, position, description, startDate, endDate, current } = req.body;

        const experience = await Experience.create({
            company,
            position,
            description,
            startDate,
            endDate,
            current
        });

        res.status(201).json({
            success: true,
            message: 'Experiencia creada exitosamente',
            data: experience
        });
    } catch (error) {
        console.error('Error al crear experiencia:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear experiencia',
            error: error.message
        });
    }
});

// PUT /api/experience/:id - Actualizar experiencia (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experiencia no encontrada'
            });
        }

        const { company, position, description, startDate, endDate, current } = req.body;

        await experience.update({
            company,
            position,
            description,
            startDate,
            endDate,
            current
        });

        res.json({
            success: true,
            message: 'Experiencia actualizada exitosamente',
            data: experience
        });
    } catch (error) {
        console.error('Error al actualizar experiencia:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar experiencia',
            error: error.message
        });
    }
});

// DELETE /api/experience/:id - Eliminar experiencia (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experiencia no encontrada'
            });
        }

        await experience.destroy();

        res.json({
            success: true,
            message: 'Experiencia eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar experiencia:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar experiencia'
        });
    }
});

module.exports = router;
