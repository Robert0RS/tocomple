import { Router } from 'express' 
import { body, param } from 'express-validator'
import { DependenciaController } from '../controllers/DependenciaController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', DependenciaController.getAll)

router.get('/email/:email',
    param('email').isEmail().withMessage('Correo electrónico no válido'),
    handleInputErrors,
    DependenciaController.getByEmail
)

router.post('/', 
    body('nombre')
        .notEmpty().withMessage('El nombre de la dependencia no puede ir vacío')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('correoNotificacion')
        .optional()
        .isEmail().withMessage('El correo de notificación debe ser válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    body('telefono')
        .optional()
        .isLength({ max: 20 }).withMessage('El teléfono no puede tener más de 20 caracteres'),
    body('direccion')
        .optional()
        .isLength({ max: 500 }).withMessage('La dirección no puede tener más de 500 caracteres'),
    body('contraseña')
        .optional()
        .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    handleInputErrors,
    DependenciaController.create
)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    DependenciaController.getById
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('nombre')
        .optional()
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('correoNotificacion')
        .optional()
        .isEmail().withMessage('El correo de notificación debe ser válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    body('telefono')
        .optional()
        .isLength({ max: 20 }).withMessage('El teléfono no puede tener más de 20 caracteres'),
    body('direccion')
        .optional()
        .isLength({ max: 500 }).withMessage('La dirección no puede tener más de 500 caracteres'),
    body('contraseña')
        .optional()
        .isLength({ min: 6, max: 255 }).withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    handleInputErrors,
    DependenciaController.updateById
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    DependenciaController.deleteById
)

export default router
