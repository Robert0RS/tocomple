import { Router } from 'express'
import { body, param } from 'express-validator'
import { UsuarioController } from '../controllers/UsuarioController'
import { handleInputErrors } from '../middleware/validation'
import { generateToken } from '../utils/auth'
import jwt from 'jsonwebtoken'

const router = Router()

// Obtener todos los usuarios
router.get('/', UsuarioController.getAll)

// Obtener usuarios por dependencia
router.get('/dependencia/:idDependencia',
    param('idDependencia').isInt().withMessage('ID de dependencia no válido')
    .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    handleInputErrors,
    UsuarioController.getByDependencia
)

// Crear un nuevo usuario
router.post('/',
    body('nombre')
        .notEmpty().withMessage('El nombre no puede ir vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('apellido')
        .notEmpty().withMessage('El apellido no puede ir vacío')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('correo')
        .notEmpty().withMessage('El correo no puede ir vacío')
        .isEmail().withMessage('Correo electrónico no válido'),
    body('passwordHash')
        .notEmpty().withMessage('La contraseña no puede ir vacía')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol')
        .notEmpty().withMessage('El rol no puede ir vacío')
        .isIn(['admin', 'dependencia']).withMessage('Rol no válido'),
    body('idDependencia')
        .if(body('rol').equals('dependencia'))
        .notEmpty().withMessage('La dependencia es requerida para usuarios de tipo dependencia')
        .isInt().withMessage('ID de dependencia no válido')
        .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    handleInputErrors,
    UsuarioController.create
)

// Obtener un usuario por ID
router.get('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    UsuarioController.getById
)

// Actualizar un usuario
router.put('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    body('nombre')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('apellido')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('correo')
        .optional()
        .isEmail().withMessage('Correo electrónico no válido'),
    body('rol')
        .optional()
        .isIn(['admin', 'dependencia']).withMessage('Rol no válido'),
    body('idDependencia')
        .optional()
        .isInt().withMessage('ID de dependencia no válido')
        .custom(value => value > 0).withMessage('ID de dependencia no válido'),
    body('activo')
        .optional()
        .isBoolean().withMessage('El estado debe ser booleano'),
    handleInputErrors,
    UsuarioController.updateById
)

// Eliminar (desactivar) un usuario
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido')
    .custom(value => value > 0).withMessage('ID no válido'),
    handleInputErrors,
    UsuarioController.deleteById
)

// Ruta para login
router.post('/login',
    body('correo').isEmail().withMessage('Correo electrónico no válido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const { correo, password } = req.body;
            const usuario = await UsuarioController.login(correo, password) as { id: number, rol: string } | null;
            if (!usuario) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }

            const token = generateToken({ id: usuario.id, rol: usuario.rol });
            res.json({ token, usuario });
        } catch (error) {
            console.error('Error en el login:', error);
            next(error); // Pasa el error al middleware de manejo de errores
        }
    }
)

export default router
