const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurar transporter de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Función para enviar email de notificación
const sendContactNotification = async (contactData) => {
    const { name, email, subject, message } = contactData;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER, // Email donde recibirás las notificaciones
        subject: `🔔 Nuevo mensaje de contacto: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px;">
                        📬 Nuevo Mensaje de Contacto
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="font-size: 14px; color: #666; margin: 5px 0;">
                            <strong style="color: #333;">Nombre:</strong> ${name}
                        </p>
                        <p style="font-size: 14px; color: #666; margin: 5px 0;">
                            <strong style="color: #333;">Email:</strong> 
                            <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                        </p>
                        <p style="font-size: 14px; color: #666; margin: 5px 0;">
                            <strong style="color: #333;">Asunto:</strong> ${subject}
                        </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="font-size: 14px; color: #333; margin: 0;">
                            <strong>Mensaje:</strong>
                        </p>
                        <p style="font-size: 14px; color: #555; margin-top: 10px; line-height: 1.6;">
                            ${message}
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #999; margin: 0;">
                            Este mensaje fue enviado desde el formulario de contacto de tu portfolio.
                        </p>
                        <p style="font-size: 12px; color: #999; margin: 5px 0 0 0;">
                            Puedes responder directamente a este email: <a href="mailto:${email}" style="color: #007bff;">${email}</a>
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error al enviar email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendContactNotification
};
