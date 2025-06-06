import type { Request, Response } from "express"
import Dependencia from "../models/Dependencia"
import jwt from 'jsonwebtoken'

export class DependenciaController {
    // Obtener todas las dependencias
    static getAll = async (req: Request, res: Response) => {
        try {
            const dependencias = await Dependencia.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ]
            })
            
            res.json(dependencias)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener las dependencias'})
        }
    }

    // Obtener dependencia por correo electrónico
    static getByEmail = async (req: Request, res: Response) => {
        try {
            const { email } = req.params
            const dependencia = await Dependencia.findOne({
                where: {
                    correoNotificacion: email
                }
            })
            
            if (!dependencia) {
                res.status(404).json({error: 'Dependencia no encontrada'})
                return
            }
            
            res.json(dependencia)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la dependencia'})
        }
    }

    // Crear una nueva dependencia
    static create = async (req: Request, res: Response): Promise<void> => {
        try {
            const dependencia = await Dependencia.create(req.body)
            res.status(201).json('Dependencia creada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al crear la dependencia' })
        }
    }

    // Obtener una dependencia por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const dependencia = await Dependencia.findByPk(id)
            
            if (!dependencia) {
                const error = new Error('Dependencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }
            
            res.json(dependencia)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la dependencia'})
        }
    }

    // Actualizar una dependencia por ID
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const dependencia = await Dependencia.findByPk(id)
            
            if (!dependencia) {
                const error = new Error('Dependencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            await dependencia.update(req.body)
            res.json('Dependencia actualizada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al actualizar la dependencia'})
        }
    }

    // Eliminar una dependencia por ID
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const dependencia = await Dependencia.findByPk(id)
            
            if (!dependencia) {
                const error = new Error('Dependencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            await dependencia.destroy()
            res.json('Dependencia eliminada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al eliminar la dependencia'})
        }
    }

    // Iniciar sesión
    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { correo, contraseña } = req.body;

            const dependencia = await Dependencia.findOne({
                where: { correoNotificacion: correo }
            });

            if (!dependencia) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }

            const contraseñaValida = await dependencia.verifyPassword(contraseña);
            if (!contraseñaValida) {
                res.status(401).json({ error: 'Credenciales inválidas' });
                return;
            }

            // Generar el token JWT
            const token = jwt.sign(
                {
                    id: dependencia.idDependencia,
                    correo: dependencia.correoNotificacion,
                    tipo: 'dependencia'
                },
                process.env.JWT_SECRET || 'tu_secreto_jwt',
                { expiresIn: '24h' }
            );

            res.json({
                token,
                dependencia: {
                    id: dependencia.idDependencia,
                    nombre: dependencia.nombre,
                    correoNotificacion: dependencia.correoNotificacion
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    // Verificar token
    static verifyToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const dependencia = await Dependencia.findByPk(req.usuario?.id, {
                attributes: { exclude: ['contraseña'] }
            });

            if (!dependencia) {
                res.status(404).json({ error: 'Dependencia no encontrada' });
                return;
            }

            res.json({
                dependencia: {
                    id: dependencia.idDependencia,
                    nombre: dependencia.nombre,
                    correoNotificacion: dependencia.correoNotificacion
                }
            });
        } catch (error) {
            console.error('Error en verifyToken:', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
}
