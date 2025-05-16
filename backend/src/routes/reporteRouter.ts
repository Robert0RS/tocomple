import { Router } from 'express' 
import { body, param } from 'express-validator'
import { ReporteController } from '../controllers/ReporteController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', ReporteController.getAll)

router.post('/', 
    body('tipo')
        .notEmpty().withMessage('El tipo de reporte no puede ir vacío')
        .isLength({ max: 50 }).withMessage('El tipo no puede tener más de 50 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('La descripción del reporte no puede ir vacía'),
    body('ubicacion')
        .optional()
        .isLength({ max: 255 }).withMessage('La ubicación no puede tener más de 255 caracteres'),
    body('latitud')
        .notEmpty().withMessage('La latitud es requerida')
        .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe ser un número entre -90 y 90'),
    body('longitud')
        .notEmpty().withMessage('La longitud es requerida')
        .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe ser un número entre -180 y 180'),
    body('imagenUrl')
        .notEmpty().withMessage('La URL de la imagen es requerida')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede tener más de 255 caracteres'),
    body('estado')
        .optional()
        .isIn(['pendiente', 'en_proceso', 'resuelto', 'rechazado'])
        .withMessage('Estado no válido'),
    body('idCiudadano')
        .notEmpty().withMessage('El ID del ciudadano es requerido')
        .isInt({ min: 1 }).withMessage('ID de ciudadano no válido'),
    handleInputErrors,
    ReporteController.create
)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    ReporteController.getById
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('tipo')
        .optional()
        .isLength({ max: 50 }).withMessage('El tipo no puede tener más de 50 caracteres'),
    body('descripcion')
        .optional(),
    body('ubicacion')
        .optional()
        .isLength({ max: 255 }).withMessage('La ubicación no puede tener más de 255 caracteres'),
    body('latitud')
        .optional()
        .isFloat({ min: -200, max: 200 }).withMessage('La latitud debe ser un número entre -200 y 200'),
    body('longitud')
        .optional()
        .isFloat({ min: -200, max: 200 }).withMessage('La longitud debe ser un número entre -200 y 200'),
    body('imagenUrl')
        .optional()
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede tener más de 255 caracteres'),
    body('estado')
        .optional()
        .isIn(['pendiente', 'en_proceso', 'resuelto', 'rechazado'])
        .withMessage('Estado no válido'),
    body('idCiudadano')
        .optional()
        .isInt({ min: 1 }).withMessage('ID de ciudadano no válido'),
    handleInputErrors,
    ReporteController.updateById
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    ReporteController.deleteById
)

// Rutas adicionales
router.get('/estado/:estado',
    param('estado')
        .isIn(['pendiente', 'en_proceso', 'resuelto', 'rechazado'])
        .withMessage('Estado no válido'),
    handleInputErrors,
    ReporteController.getByEstado
)

router.get('/ciudadano/:idCiudadano',
    param('idCiudadano')
        .isInt({ min: 1 }).withMessage('ID de ciudadano no válido'),
    handleInputErrors,
    ReporteController.getByCiudadano
)

export default router 