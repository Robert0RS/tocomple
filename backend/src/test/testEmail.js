require('dotenv').config();
const { sendReportNotification } = require('../services/enviarCorreo');

async function testEmail() {
    try {
        const testReport = {
            userEmail: 'galileaserrano09@gmail.com', // Reemplaza con el correo donde quieres recibir la prueba
            fileName: 'reporte_prueba.pdf',
            startDate: '2024-03-01',
            endDate: '2024-03-20',
            generatedAt: new Date()
        };

        console.log('Intentando enviar correo de prueba...');
        console.log('Configuración actual:');
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('APP_URL:', process.env.APP_URL);
        
        const result = await sendReportNotification(testReport);
        
        if (result.success) {
            console.log('¡Correo enviado exitosamente!');
            console.log('ID del mensaje:', result.messageId);
        } else {
            console.error('Error al enviar el correo:', result.error);
            console.error('Detalles:', result.details);
        }
    } catch (error) {
        console.error('Error en la prueba:', error);
    }
}

// Ejecutar la prueba
testEmail(); 