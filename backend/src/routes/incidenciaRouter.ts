import { Router } from 'express'
import { body, param } from 'express-validator'
import { IncidenciaController } from '../controllers/IncidenciaController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

// Obtener todas las incidencias
router.get('/', IncidenciaController.getAll)

// Obtener incidencias por estado
router.get('/estado/:estado',
    param('estado')
        .isIn(['pendiente', 'en_proceso', 'resuelto', 'rechazado'])
        .withMessage('Estado no válido'),
    handleInputErrors,
    IncidenciaController.getByEstado
)

// Obtener incidencias por ciudadano
router.get('/ciudadano/:idCiudadano',
    param('idCiudadano')
        .isInt().withMessage('ID de ciudadano no válido')
        .custom(value => value > 0).withMessage('ID de ciudadano no válido'),
    handleInputErrors,
    IncidenciaController.getByCiudadano
)

// Obtener una incidencia por ID
router.get('/:id',
    param('id')
        .isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    IncidenciaController.getById
)

// Crear una nueva incidencia
router.post('/',
    body('categoria')
        .notEmpty().withMessage('La categoría es obligatoria'),
    body('descripcionCiudadano')
        .optional()
        .notEmpty().withMessage('La descripción no puede estar vacía'),
    body('latitud')
        .notEmpty().withMessage('La latitud es obligatoria')
        .isFloat().withMessage('La latitud debe ser un número'),
    body('longitud')
        .notEmpty().withMessage('La longitud es obligatoria')
        .isFloat().withMessage('La longitud debe ser un número'),
    body('imagenUrl')
        .notEmpty().withMessage('La URL de la imagen es obligatoria'),
    body('idCiudadano')
        .notEmpty().withMessage('El ID del ciudadano es obligatorio')
        .isInt().withMessage('ID de ciudadano no válido')
        .custom(value => value > 0).withMessage('ID de ciudadano no válido'),
    body('prioridad')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La prioridad debe ser un número entre 1 y 5'),
    handleInputErrors,
    IncidenciaController.create
)

// Actualizar una incidencia
router.put('/:id',
    param('id')
        .isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('estadoReporte')
        .optional()
        .isIn(['pendiente', 'en_proceso', 'resuelto', 'rechazado'])
        .withMessage('Estado no válido'),
    body('prioridad')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La prioridad debe ser un número entre 1 y 5'),
    handleInputErrors,
    IncidenciaController.update
)

// Eliminar una incidencia
router.delete('/:id',
    param('id')
        .isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    IncidenciaController.delete
)

export default router 