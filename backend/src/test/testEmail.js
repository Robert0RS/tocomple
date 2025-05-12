require('dotenv').config();
const { sendIncidentNotification } = require('../services/enviarCorreo');

async function testIncidentEmail() {
    try {
        const simulatedIncident = {
            id: 'INC-2025-TEST001',
            tipo: 'Fuga de agua',
            descripcion: 'Se detectó una fuga de agua en la calle principal.',
            ciudadano: 'María López',
            email: 'galileaserrano09@gmail.com', // Cambia esto si deseas usar otro correo
            ubicacion: 'Calle Principal #123, Villa de Álvarez',
            prioridad: 'Alta',
            estado: 'Pendiente',
            dependencia: 'Agua Potable',
            imagenes: [
                'https://via.placeholder.com/300x200?text=Fuga1',
                'https://via.placeholder.com/300x200?text=Fuga2'
            ],
            fecha: '2025-05-09',
            hora: '10:30 AM'
        };

        console.log('Enviando correo de prueba con datos simulados...');
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('APP_URL:', process.env.APP_URL);

        const result = await sendIncidentNotification(simulatedIncident);

        if (result.success) {
            console.log('✅ Correo enviado exitosamente.');
            console.log('📨 ID del mensaje:', result.messageId);
        } else {
            console.error('❌ Error al enviar el correo:', result.error);
            console.error('📋 Detalles:', result.details);
        }
    } catch (error) {
        console.error('❗ Error inesperado en la prueba:', error);
    }
}

// Ejecutar prueba
testIncidentEmail();
