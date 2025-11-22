const express = require('express');
const router = express.Router();
const { Skill } = require('../models');
const authMiddleware = require('../middleware/auth');

// GET /api/skills - Listar todas las habilidades (público)
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.findAll({
            order: [['category', 'ASC'], ['level', 'DESC']]
        });

        res.json({
            success: true,
            data: skills
        });
    } catch (error) {
        console.error('Error al obtener habilidades:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener habilidades'
        });
    }
});

// POST /api/skills - Crear habilidad (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, category, level, icon } = req.body;

        const skill = await Skill.create({
            name,
            category,
            level,
            icon
        });

        res.status(201).json({
            success: true,
            message: 'Habilidad creada exitosamente',
            data: skill
        });
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear habilidad',
            error: error.message
        });
    }
});

// PUT /api/skills/:id - Actualizar habilidad (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.findByPk(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Habilidad no encontrada'
            });
        }

        const { name, category, level, icon } = req.body;

        await skill.update({
            name,
            category,
            level,
            icon
        });

        res.json({
            success: true,
            message: 'Habilidad actualizada exitosamente',
            data: skill
        });
    } catch (error) {
        console.error('Error al actualizar habilidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar habilidad',
            error: error.message
        });
    }
});

// DELETE /api/skills/:id - Eliminar habilidad (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.findByPk(req.params.id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Habilidad no encontrada'
            });
        }

        await skill.destroy();

        res.json({
            success: true,
            message: 'Habilidad eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar habilidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar habilidad'
        });
    }
});

module.exports = router;
