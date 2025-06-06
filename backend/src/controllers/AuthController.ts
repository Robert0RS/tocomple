import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Ciudadano from '../models/Ciudadano';

export class AuthController {
    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { correo, contraseña } = req.body;

            // Validar que se proporcionen las credenciales
            if (!correo || !contraseña) {
                res.status(400).json({ error: 'Correo y contraseña son requeridos' });
                return;
            }

            // Buscar el ciudadano por correo
            const ciudadano = await Ciudadano.findOne({
                where: { correo }
            });

            // Verificar si el ciudadano existe
            if (!ciudadano) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }

            // Verificar la contraseña
            const contraseñaValida = await ciudadano.verifyPassword(contraseña);
            if (!contraseñaValida) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }

            // Generar el token JWT
            const token = jwt.sign(
                {
                    id: ciudadano.idCiudadano,
                    correo: ciudadano.correo
                },
                process.env.JWT_SECRET || 'tu_secreto_jwt',
                { expiresIn: '24h' }
            );

            // Enviar la respuesta con el token y la información del usuario
            res.json({
                token,
                usuario: {
                    id: ciudadano.idCiudadano,
                    primerNombre: ciudadano.primerNombre,
                    primerApellido: ciudadano.primerApellido,
                    correo: ciudadano.correo
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    // Endpoint para verificar el token actual
    static verifyToken = async (req: Request, res: Response): Promise<void> => {
        try {
            // Si llegamos aquí, significa que el middleware de autenticación ya verificó el token
            const ciudadano = await Ciudadano.findByPk(req.usuario?.id, {
                attributes: { exclude: ['contraseña'] }
            });

            if (!ciudadano) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }

            res.json({
                usuario: {
                    id: ciudadano.idCiudadano,
                    primerNombre: ciudadano.primerNombre,
                    primerApellido: ciudadano.primerApellido,
                    correo: ciudadano.correo
                }
            });
        } catch (error) {
            console.error('Error en verifyToken:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
} 