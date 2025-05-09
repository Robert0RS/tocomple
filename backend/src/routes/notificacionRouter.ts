import { Router } from 'express'
import { body, param } from 'express-validator'
import { NotificacionController } from '../controllers/NotificacionController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

// Obtener todas las notificaciones
router.get('/', NotificacionController.getAll)

// Obtener notificaciones por usuario
router.get('/usuario/:idUsuario',
    param('idUsuario').isInt().withMessage('ID de usuario no válido')
    .custom(value => value > 0).withMessage('ID de usuario no válido'),
    handleInputErrors,
    NotificacionController.getByUsuario
)

// Obtener notificaciones por dependencia
router.get('/dependencia/:idDependencia',
    param('idDependencia').isInt().withMessage('ID de dependencia no válido')
    .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    handleInputErrors,
    NotificacionController.getByDependencia
)

// Crear una nueva notificación
router.post('/',
    body('titulo')
        .notEmpty().withMessage('El título no puede ir vacío')
        .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
    body('mensaje')
        .notEmpty().withMessage('El mensaje no puede ir vacío'),
    body('tipo')
        .notEmpty().withMessage('El tipo no puede ir vacío')
        .isLength({ max: 20 }).withMessage('El tipo no puede tener más de 20 caracteres'),
    body('idUsuario')
        .optional()
        .isInt().withMessage('ID de usuario no válido')
        .custom(value => value > 0).withMessage('ID de usuario no válido'),
    body('idDependencia')
        .optional()
        .isInt().withMessage('ID de dependencia no válido')
        .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    handleInputErrors,
    NotificacionController.create
)

// Obtener una notificación por ID
router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    NotificacionController.getById
)

// Actualizar una notificación
router.put('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    body('titulo')
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
    body('mensaje')
        .optional()
        .notEmpty().withMessage('El mensaje no puede ir vacío'),
    body('tipo')
        .optional()
        .isLength({ max: 20 }).withMessage('El tipo no puede tener más de 20 caracteres'),
    body('idUsuario')
        .optional()
        .isInt().withMessage('ID de usuario no válido')
        .custom(value => value > 0).withMessage('ID de usuario no válido'),
    body('idDependencia')
        .optional()
        .isInt().withMessage('ID de dependencia no válido')
        .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    body('leida')
        .optional()
        .isBoolean().withMessage('El estado de lectura debe ser booleano'),
    handleInputErrors,
    NotificacionController.updateById
)

// Marcar notificación como leída
router.patch('/:id/leer',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    NotificacionController.marcarComoLeida
)

// Eliminar una notificación
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    NotificacionController.deleteById
)

export default router
