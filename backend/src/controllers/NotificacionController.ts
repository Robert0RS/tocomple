import type { Request, Response } from "express"
import Notificacion from "../models/Notificacion"

export class NotificacionController {
    // Obtener todas las notificaciones
    static getAll = async (req: Request, res: Response) => {
        try {
            const notificaciones = await Notificacion.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'dependencia' }
                ]
            })
            
            res.json(notificaciones)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las notificaciones' })
        }
    }

    // Crear una nueva notificación
    static create = async (req: Request, res: Response) => {
        try {
            const notificacion = new Notificacion(req.body)
            await notificacion.save()
            res.status(201).json('Notificación creada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al crear la notificación' })
            }
        }
    }

    // Obtener una notificación por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const notificacion = await Notificacion.findByPk(id, {
                include: [
                    { association: 'usuario' },
                    { association: 'dependencia' }
                ]
            })
            
            if (!notificacion) {
                const error = new Error('Notificación no encontrada')
                res.status(404).json({ error: error.message })
                return
            }
            res.json(notificacion)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener la notificación' })
        }
    }

    // Actualizar una notificación
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const notificacion = await Notificacion.findByPk(id)
            
            if (!notificacion) {
                const error = new Error('Notificación no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            await notificacion.update(req.body)
            res.json('Notificación actualizada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al actualizar la notificación' })
            }
        }
    }

    // Eliminar una notificación
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const notificacion = await Notificacion.findByPk(id)
            
            if (!notificacion) {
                const error = new Error('Notificación no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            await notificacion.destroy()
            res.json('Notificación eliminada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al eliminar la notificación' })
        }
    }

    // Obtener notificaciones por usuario
    static getByUsuario = async (req: Request, res: Response) => {
        try {
            const { idUsuario } = req.params
            const notificaciones = await Notificacion.findAll({
                where: {
                    idUsuario
                },
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'dependencia' }
                ]
            })
            res.json(notificaciones)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las notificaciones del usuario' })
        }
    }

    // Obtener notificaciones por dependencia
    static getByDependencia = async (req: Request, res: Response) => {
        try {
            const { idDependencia } = req.params
            const notificaciones = await Notificacion.findAll({
                where: {
                    idDependencia
                },
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                include: [
                    { association: 'usuario' },
                    { association: 'dependencia' }
                ]
            })
            res.json(notificaciones)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las notificaciones de la dependencia' })
        }
    }

    // Marcar notificación como leída
    static marcarComoLeida = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const notificacion = await Notificacion.findByPk(id)
            
            if (!notificacion) {
                const error = new Error('Notificación no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            await notificacion.update({ leida: true })
            res.json('Notificación marcada como leída correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al marcar la notificación como leída' })
        }
    }
}
