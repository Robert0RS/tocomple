import type { Request, Response } from "express"
import Dependencia from "../models/Dependencia"
import bcrypt from "bcrypt"

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
    static create = async (req: Request, res: Response) => {
        try {
            const { contraseña, ...data } = req.body
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(contraseña, salt)

            const dependencia = await Dependencia.create({
                ...data,
                contraseña: hashedPassword
            })

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
    static async login(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) {
        try {
            const { correo, contraseña } = req.body;
            // TODO: Validar las credenciales del usuario y responder en consecuencia
            return res.status(200).json({ message: 'Inicio de sesión exitoso (placeholder)' });
        } catch (error) {
            next(error);
        }
    }
}
