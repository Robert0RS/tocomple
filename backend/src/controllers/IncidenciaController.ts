import type { Request, Response } from "express"
import Incidencia from "../models/Incidencia"
import Notificacion from "../models/Notificacion"
import { Op } from "sequelize"

export class IncidenciaController {
    // Obtener todas las incidencias
    static getAll = async (req: Request, res: Response) => {
        try {
            const incidencias = await Incidencia.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                include: [
                    { model: Incidencia.associations.dependencia.target },
                    { model: Incidencia.associations.categoria.target }
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener las incidencias'})
        }
    }

    // Crear una nueva incidencia
    static create = async (req: Request, res: Response) => {
        try {
            const incidencia = new Incidencia(req.body)
            await incidencia.save()

            // Cargar la categoría si existe
            if (incidencia.idCategoria) {
                await incidencia.reload({
                    include: [{ model: Incidencia.associations.categoria.target }]
                })
            }

            // Crear notificación automática
            const notificacion = new Notificacion({
                titulo: 'Nueva Incidencia Creada',
                mensaje: `Se ha creado una nueva incidencia: ${incidencia.titulo || 'Sin título'}`,
                tipo: incidencia.categoria?.nombre || 'SIN_CATEGORIA',
                idDependencia: incidencia.idDependencia
            })
            await notificacion.save()

            res.status(201).json('Incidencia creada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: 'Hubo un error al crear la incidencia'})
            }
        }
    }

    // Obtener una incidencia por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id, {
                include: [
                    { model: Incidencia.associations.dependencia.target },
                    { model: Incidencia.associations.categoria.target }
                ]
            })
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }
            
            res.json(incidencia)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la incidencia'})
        }
    }

    // Actualizar una incidencia por ID
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id)
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            // Si el estado cambia a 'Resuelto' o 'Cancelado', actualizar fechaCierre
            if (req.body.estado && 
                ['Resuelto', 'Cancelado'].includes(req.body.estado) && 
                incidencia.estado !== req.body.estado) {
                req.body.fechaCierre = new Date()
            }

            await incidencia.update(req.body)
            res.json('Incidencia actualizada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: 'Hubo un error al actualizar la incidencia'})
            }
        }
    }

    // Eliminar una incidencia por ID
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id)
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            await incidencia.destroy()
            res.json('Incidencia eliminada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al eliminar la incidencia'})
        }
    }

    // Obtener incidencias por estado
    static getByEstado = async (req: Request, res: Response) => {
        try {
            const { estado } = req.params
            const incidencias = await Incidencia.findAll({
                where: { estado },
                order: [['fechaCreacion', 'DESC']],
                include: [
                    { model: Incidencia.associations.dependencia.target },
                    { model: Incidencia.associations.categoria.target }
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener las incidencias por estado'})
        }
    }

    // Obtener incidencias por dependencia
    static getByDependencia = async (req: Request, res: Response) => {
        try {
            const { idDependencia } = req.params
            const incidencias = await Incidencia.findAll({
                where: { idDependencia },
                order: [['fechaCreacion', 'DESC']],
                include: [
                    { model: Incidencia.associations.dependencia.target },
                    { model: Incidencia.associations.categoria.target }
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener las incidencias por dependencia'})
        }
    }
}
