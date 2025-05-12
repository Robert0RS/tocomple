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

// Función para enviar notificación de incidencia nueva
async function sendIncidentNotification(incident) {
  if (!incident || !incident.email || !incident.id || !incident.descripcion || !incident.tipo || !incident.ciudadano) {
    throw new Error('Faltan datos requeridos en la incidencia');
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: incident.email,
      subject: `Incidencia nueva creada: ${incident.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #f8f3e9; padding: 15px; text-align: center; border-bottom: 1px solid #e0e0e0;">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=40&width=120" alt="Logo Sistema" style="height: 40px;">
          </div>

          <!-- Main Content -->
          <div style="background-color: #ffffff; padding: 25px;">
            <h1 style="color: #333333; text-align: center; font-size: 24px; margin-top: 0;">Nueva incidencia reportada</h1>

            <div style="margin: 20px 0; text-align: center;">
              <p style="font-size: 16px; color: #555;">
                <strong>${incident.ciudadano}</strong> ha reportado una nueva incidencia
              </p>
              <p style="font-size: 14px; color: #777; margin-top: 5px;">
                ${incident.fecha || new Date().toLocaleDateString()} a las ${incident.hora || new Date().toLocaleTimeString()}
              </p>
            </div>

            <!-- Incident Details -->
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #444; font-size: 18px; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                Detalles de la incidencia
              </h2>

              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold; width: 40%;">Número:</td><td>${incident.id}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Tipo:</td><td>${incident.tipo}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Descripción:</td><td>${incident.descripcion}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Ubicación:</td><td>${incident.ubicacion || 'Sin especificar'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Dependencia:</td><td>${incident.dependencia || 'General'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Prioridad:</td><td>${incident.prioridad || 'Media'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Estado:</td><td><span style="background-color: #FFF3CD; color: #856404; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${incident.estado || 'Pendiente'}</span></td></tr>
              </table>
            </div>

            <!-- Images -->
            ${incident.imagenes?.length ? `
              <div style="margin: 25px 0;">
                <h3 style="color: #444; font-size: 16px; margin-bottom: 15px;">Imágenes adjuntas:</h3>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                  ${incident.imagenes.map(img => `
                    <div style="width: 48%; margin-bottom: 10px;">
                      <img src="${img}" alt="Imagen de incidencia" style="width: 100%; border-radius: 4px; border: 1px solid #eee;">
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Action Button -->
            <div style="text-align: center; margin: 30px 0 15px;">
              <a href="${process.env.APP_URL || 'https://sistema-incidencias.ejemplo.com'}/incidencia-detalle.html?id=${incident.id}" 
                 style="background-color: #d68c60; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Ver detalles de la incidencia
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f3e9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #666; font-size: 14px;">Sistema de Gestión de Incidencias Municipales</p>
            <p style="margin-top: 15px; font-size: 12px; color: #888;">© 2025 Municipio. Todos los derechos reservados.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de notificación de incidencia enviado exitosamente:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error detallado al enviar email de incidencia:', {
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
  sendIncidentNotification
};
