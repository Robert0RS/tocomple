const nodemailer = require('nodemailer');

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Función para enviar notificación de reporte generado
async function sendReportNotification(report) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: report.userEmail, // Email del usuario que generó el reporte
      subject: `Nuevo reporte generado: ${report.fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logo" alt="Logo" style="max-width: 150px;">
          </div>
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
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './public/assets/images/logo.png',
          cid: 'logo'
        },
        // adjuntar el PDF del reporte
        {
          filename: report.fileName,
          path: `./public/reports/${report.fileName}`
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendReportNotification
};