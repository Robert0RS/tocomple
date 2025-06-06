import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para incluir el usuario
declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id: number;
                correo: string;
            }
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Obtener el token del header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1];
        
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_jwt') as {
            id: number;
            correo: string;
        };

        // Agregar la información del usuario al request
        req.usuario = {
            id: decoded.id,
            correo: decoded.correo
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}; 