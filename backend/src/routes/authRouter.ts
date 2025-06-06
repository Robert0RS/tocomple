import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware/validation';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Ruta de login
router.post('/login',
    body('correo')
        .isEmail().withMessage('Correo electrónico no válido'),
    body('contraseña')
        .notEmpty().withMessage('La contraseña es requerida'),
    handleInputErrors,
    AuthController.login
);

// Ruta para verificar el token
router.get('/verify',
    authMiddleware,
    AuthController.verifyToken
);

export default router; 