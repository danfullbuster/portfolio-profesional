const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// POST /api/auth/login - Autenticación de administrador
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar datos
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            });
        }

        // Buscar usuario
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Validar contraseña
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        res.json({
            success: true,
            message: 'Autenticación exitosa',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

module.exports = router;
