import { Router } from 'express'
import { body, param } from 'express-validator'
import { CiudadanoController } from '../controllers/CiudadanoController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

// Obtener todos los ciudadanos
router.get('/', CiudadanoController.getAll)

// Obtener ciudadano por correo
router.get('/email/:email',
    param('email')
        .isEmail().withMessage('Correo electrónico no válido'),
    handleInputErrors,
    CiudadanoController.getByEmail
)

// Crear un nuevo ciudadano
router.post('/',
    body('primerNombre')
        .notEmpty().withMessage('El primer nombre no puede ir vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El primer nombre debe tener entre 2 y 50 caracteres'),
    body('segundoNombre')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El segundo nombre debe tener entre 2 y 50 caracteres'),
    body('primerApellido')
        .notEmpty().withMessage('El primer apellido no puede ir vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El primer apellido debe tener entre 2 y 50 caracteres'),
    body('segundoApellido')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El segundo apellido debe tener entre 2 y 50 caracteres'),
    body('correo')
        .notEmpty().withMessage('El correo no puede ir vacío')
        .isEmail().withMessage('Correo electrónico no válido'),
    body('numero')
        .notEmpty().withMessage('El número de teléfono no puede ir vacío')
        .isLength({ min: 7, max: 20 }).withMessage('El número debe tener entre 7 y 20 caracteres'),
    body('contraseña')
        .notEmpty().withMessage('La contraseña no puede ir vacía')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    CiudadanoController.create
)

// Obtener un ciudadano por ID
router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    CiudadanoController.getById
)

// Actualizar un ciudadano
router.put('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('primerNombre')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El primer nombre debe tener entre 2 y 50 caracteres'),
    body('segundoNombre')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El segundo nombre debe tener entre 2 y 50 caracteres'),
    body('primerApellido')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El primer apellido debe tener entre 2 y 50 caracteres'),
    body('segundoApellido')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El segundo apellido debe tener entre 2 y 50 caracteres'),
    body('correo')
        .optional()
        .isEmail().withMessage('Correo electrónico no válido'),
    body('numero')
        .optional()
        .isLength({ min: 7, max: 20 }).withMessage('El número debe tener entre 7 y 20 caracteres'),
    body('contraseña')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    CiudadanoController.updateById
)

// Eliminar un ciudadano
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    CiudadanoController.deleteById
)

export default router 