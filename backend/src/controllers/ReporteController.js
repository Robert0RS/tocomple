const Reporte = require('../models/Reporte');
const Ciudadano = require('../models/Ciudadano');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuración para subida de imágenes
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/reportes');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'reporte-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png)'));
  }
}).single('image');

// Crear un nuevo reporte
exports.crearReporte = async (req, res) => {
  try {
    const { tipo, descripcion, ubicacion, latitud, longitud, estado, idCiudadano } = req.body;
    
    // Validar que el ciudadano existe
    const ciudadano = await Ciudadano.findByPk(idCiudadano);
    if (!ciudadano) {
      return res.status(404).json({ error: 'Ciudadano no encontrado' });
    }
    
    // Crear el reporte
    const nuevoReporte = await Reporte.create({
      tipo,
      descripcion,
      ubicacion,
      latitud,
      longitud,
      estado: estado || 'pendiente',
      idCiudadano
    });
    
    res.status(201).json(nuevoReporte);
  } catch (error) {
    console.error('Error al crear reporte:', error);
    res.status(500).json({ error: 'Error al crear el reporte' });
  }
};

// Subir imagen para un reporte
exports.subirImagen = (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Error de Multer: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    try {
      const { idReporte } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
      }
      
      // Buscar el reporte
      const reporte = await Reporte.findByPk(idReporte);
      if (!reporte) {
        // Eliminar el archivo si el reporte no existe
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      
      // Actualizar la URL de la imagen
      const imagenUrl = `/uploads/reportes/${req.file.filename}`;
      await reporte.update({ imagenUrl });
      
      res.status(200).json({ 
        mensaje: 'Imagen subida correctamente',
        imagenUrl,
        reporte
      });
    } catch (error) {
      console.error('Error al subir imagen:', error);
      // Intentar eliminar el archivo en caso de error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error('Error al eliminar archivo:', unlinkError);
        }
      }
      res.status(500).json({ error: 'Error al procesar la imagen' });
    }
  });
};

// Obtener todos los reportes
exports.obtenerTodosReportes = async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      order: [['fechaCreacion', 'DESC']]
    });
    res.status(200).json(reportes);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
};

// Obtener reportes por ciudadano
exports.obtenerReportesPorCiudadano = async (req, res) => {
  try {
    const { idCiudadano } = req.params;
    
    // Validar que el ciudadano existe
    const ciudadano = await Ciudadano.findByPk(idCiudadano);
    if (!ciudadano) {
      return res.status(404).json({ error: 'Ciudadano no encontrado' });
    }
    
    const reportes = await Reporte.findAll({
      where: { idCiudadano },
      order: [['fechaCreacion', 'DESC']]
    });
    
    res.status(200).json(reportes);
  } catch (error) {
    console.error('Error al obtener reportes del ciudadano:', error);
    res.status(500).json({ error: 'Error al obtener los reportes del ciudadano' });
  }
};

// Obtener un reporte por ID
exports.obtenerReportePorId = async (req, res) => {
  try {
    const { idReporte } = req.params;
    
    const reporte = await Reporte.findByPk(idReporte, {
      include: [{ model: Ciudadano, attributes: ['primerNombre', 'primerApellido', 'correo'] }]
    });
    
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    
    res.status(200).json(reporte);
  } catch (error) {
    console.error('Error al obtener reporte:', error);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
};

// Actualizar estado de un reporte
exports.actualizarEstadoReporte = async (req, res) => {
  try {
    const { idReporte } = req.params;
    const { estado } = req.body;
    
    // Validar el estado
    if (!['pendiente', 'en_proceso', 'resuelto'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }
    
    const reporte = await Reporte.findByPk(idReporte);
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    
    // Actualizar el estado y la fecha de actualización
    await reporte.update({ 
      estado,
      fechaActualizacion: new Date()
    });
    
    res.status(200).json(reporte);
  } catch (error) {
    console.error('Error al actualizar estado del reporte:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del reporte' });
  }
};

// Eliminar un reporte
exports.eliminarReporte = async (req, res) => {
  try {
    const { idReporte } = req.params;
    
    const reporte = await Reporte.findByPk(idReporte);
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    
    // Si tiene imagen, eliminarla
    if (reporte.imagenUrl) {
      const imagePath = path.join(__dirname, '..', reporte.imagenUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await reporte.destroy();
    
    res.status(200).json({ mensaje: 'Reporte eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar reporte:', error);
    res.status(500).json({ error: 'Error al eliminar el reporte' });
  }
};

// Buscar reportes por criterios
exports.buscarReportes = async (req, res) => {
  try {
    const { tipo, estado, fechaInicio, fechaFin } = req.query;
    
    const where = {};
    
    if (tipo) {
      where.tipo = tipo;
    }
    
    if (estado) {
      where.estado = estado;
    }
    
    if (fechaInicio && fechaFin) {
      where.fechaCreacion = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      };
    } else if (fechaInicio) {
      where.fechaCreacion = {
        [Op.gte]: new Date(fechaInicio)
      };
    } else if (fechaFin) {
      where.fechaCreacion = {
        [Op.lte]: new Date(fechaFin)
      };
    }
    
    const reportes = await Reporte.findAll({
      where,
      order: [['fechaCreacion', 'DESC']]
    });
    
    res.status(200).json(reportes);
  } catch (error) {
    console.error('Error al buscar reportes:', error);
    res.status(500).json({ error: 'Error al buscar reportes' });
  }
};