const nodemailer = require('nodemailer');

// Validar variables de entorno
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  throw new Error('Las variables de entorno EMAIL_USER y EMAIL_PASSWORD son requeridas');
}

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verificar la conexión al iniciar
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error al verificar la configuración del correo:', error);
  } else {
    console.log('Servidor de correo listo para enviar mensajes');
  }
});

// Función para enviar notificación de reporte generado
async function sendReportNotification(report) {
  if (!report || !report.userEmail || !report.fileName) {
    throw new Error('Faltan datos requeridos en el reporte');
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: report.userEmail,
      subject: `Nuevo reporte generado: ${report.fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0051a8; text-align: center;">Reporte Generado Exitosamente</h2>
          <p>Se ha generado un nuevo reporte de incidencias con los siguientes detalles:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Nombre del archivo:</strong> ${report.fileName}</p>
            <p><strong>Período:</strong> ${report.startDate} al ${report.endDate}</p>
            <p><strong>Generado el:</strong> ${new Date(report.generatedAt).toLocaleString()}</p>
          </div>
          <p>Puede acceder al reporte a través del sistema o descargarlo desde el panel de reportes.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.APP_URL}/reportes.html" style="background-color: #0051a8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver Reportes</a>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
            Este es un correo automático, por favor no responda a este mensaje.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error detallado al enviar email:', {
      error: error.message,
      code: error.code,
      command: error.command
    });
    return { 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        command: error.command
      }
    };
  }
}

module.exports = {
  sendReportNotification
};