import { Router } from 'express' 
import { body, param } from 'express-validator'
import { IncidenciaController } from '../controllers/IncidenciaController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', IncidenciaController.getAll)

router.post('/', 
    body('titulo')
        .notEmpty().withMessage('El título de la incidencia no puede ir vacío')
        .isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('La descripción de la incidencia no puede ir vacía'),
    body('ubicacion')
        .notEmpty().withMessage('La ubicación no puede ir vacía')
        .isLength({ max: 255 }).withMessage('La ubicación no puede tener más de 255 caracteres'),
    body('latitud')
        .optional()
        .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe ser un número entre -90 y 90'),
    body('longitud')
        .optional()
        .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe ser un número entre -180 y 180'),
    body('nombreCiudadano')
        .notEmpty().withMessage('El nombre del ciudadano no puede ir vacío')
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('correoCiudadano')
        .optional()
        .isEmail().withMessage('El correo del ciudadano debe ser válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    body('telefonoCiudadano')
        .optional()
        .isLength({ max: 20 }).withMessage('El teléfono no puede tener más de 20 caracteres'),
    body('idDependencia')
        .notEmpty().withMessage('La dependencia es requerida')
        .isInt({ min: 1 }).withMessage('ID de dependencia no válido'),
    body('idCategoria')
        .optional()
        .isInt({ min: 1 }).withMessage('ID de categoría no válido'),
    body('estado')
        .optional()
        .isIn(['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'])
        .withMessage('Estado no válido'),
    body('prioridad')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La prioridad debe ser un número entre 1 y 5'),
    handleInputErrors,
    IncidenciaController.create
)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    IncidenciaController.getById
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('titulo')
        .optional()
        .isLength({ max: 100 }).withMessage('El título no puede tener más de 100 caracteres'),
    body('descripcion')
        .optional(),
    body('ubicacion')
        .optional()
        .isLength({ max: 255 }).withMessage('La ubicación no puede tener más de 255 caracteres'),
    body('latitud')
        .optional()
        .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe ser un número entre -90 y 90'),
    body('longitud')
        .optional()
        .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe ser un número entre -180 y 180'),
    body('nombreCiudadano')
        .optional()
        .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres'),
    body('correoCiudadano')
        .optional()
        .isEmail().withMessage('El correo del ciudadano debe ser válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    body('telefonoCiudadano')
        .optional()
        .isLength({ max: 20 }).withMessage('El teléfono no puede tener más de 20 caracteres'),
    body('idDependencia')
        .optional()
        .isInt({ min: 1 }).withMessage('ID de dependencia no válido'),
    body('idCategoria')
        .optional()
        .isInt({ min: 1 }).withMessage('ID de categoría no válido'),
    body('estado')
        .optional()
        .isIn(['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'])
        .withMessage('Estado no válido'),
    body('prioridad')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La prioridad debe ser un número entre 1 y 5'),
    handleInputErrors,
    IncidenciaController.updateById
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    IncidenciaController.deleteById
)

// Rutas adicionales
router.get('/estado/:estado',
    param('estado')
        .isIn(['Pendiente', 'En proceso', 'Resuelto', 'Cancelado'])
        .withMessage('Estado no válido'),
    handleInputErrors,
    IncidenciaController.getByEstado
)

router.get('/dependencia/:idDependencia',
    param('idDependencia')
        .isInt({ min: 1 }).withMessage('ID de dependencia no válido'),
    handleInputErrors,
    IncidenciaController.getByDependencia
)

export default router
