const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');


// Rutas públicas 

// Rutas protegidas
router.post('/', authMiddleware.verificarToken, reporteController.crearReporte);
router.post('/upload-imagen', authMiddleware.verificarToken, reporteController.subirImagen);
router.get('/', authMiddleware.verificarToken, reporteController.obtenerTodosReportes);
router.get('/ciudadano/:idCiudadano', authMiddleware.verificarToken, reporteController.obtenerReportesPorCiudadano);
router.get('/buscar', authMiddleware.verificarToken, reporteController.buscarReportes);
router.get('/:idReporte', authMiddleware.verificarToken, reporteController.obtenerReportePorId);
router.patch('/:idReporte/estado', authMiddleware.verificarToken, reporteController.actualizarEstadoReporte);
router.delete('/:idReporte', authMiddleware.verificarToken, reporteController.eliminarReporte);

module.exports = router;