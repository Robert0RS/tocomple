import { Router } from 'express' 
import { body, param } from 'express-validator'
import { CategoriaController } from '../controllers/CategoriaController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', CategoriaController.getAll)

router.post('/', 
    body('nombre')
        .notEmpty().withMessage('El nombre de la categoría no puede ir vacío')
        .isLength({ max: 50 }).withMessage('El nombre no puede tener más de 50 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('icono')
        .optional()
        .isLength({ max: 50 }).withMessage('El icono no puede tener más de 50 caracteres'),
    body('color')
        .optional()
        .isLength({ max: 20 }).withMessage('El color no puede tener más de 20 caracteres'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    handleInputErrors,
    CategoriaController.create
)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    CategoriaController.getById
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    body('nombre')
        .optional()
        .isLength({ max: 50 }).withMessage('El nombre no puede tener más de 50 caracteres'),
    body('descripcion')
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
    body('icono')
        .optional()
        .isLength({ max: 50 }).withMessage('El icono no puede tener más de 50 caracteres'),
    body('color')
        .optional()
        .isLength({ max: 20 }).withMessage('El color no puede tener más de 20 caracteres'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado activo debe ser un valor booleano'),
    handleInputErrors,
    CategoriaController.updateById
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    CategoriaController.deleteById
)

export default router
