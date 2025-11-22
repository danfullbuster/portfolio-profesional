const express = require('express');
const router = express.Router();
const { Contact } = require('../models');
const authMiddleware = require('../middleware/auth');
const { sendContactNotification } = require('../config/email');

// GET /api/contact - Listar mensajes de contacto (requiere autenticación)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener mensajes'
        });
    }
});

// POST /api/contact - Enviar mensaje de contacto (público)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validar datos
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            read: false
        });

        // Enviar notificación por email
        await sendContactNotification({ name, email, subject, message });

        res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            data: contact
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar mensaje',
            error: error.message
        });
    }
});

// PUT /api/contact/:id/read - Marcar mensaje como leído (requiere autenticación)
router.put('/:id/read', authMiddleware, async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Mensaje no encontrado'
            });
        }

        await contact.update({ read: true });

        res.json({
            success: true,
            message: 'Mensaje marcado como leído',
            data: contact
        });
    } catch (error) {
        console.error('Error al actualizar mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar mensaje'
        });
    }
});

// DELETE /api/contact/:id - Eliminar mensaje (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Mensaje no encontrado'
            });
        }

        await contact.destroy();

        res.json({
            success: true,
            message: 'Mensaje eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar mensaje'
        });
    }
});

module.exports = router;
