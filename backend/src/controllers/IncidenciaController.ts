import type { Request, Response } from "express"
import Incidencia from "../models/Incidencia"
import Ciudadano from "../models/Ciudadano"

export class IncidenciaController {
    // Obtener todas las incidencias
    static getAll = async (req: Request, res: Response) => {
        try {
            const incidencias = await Incidencia.findAll({
                include: [{
                    model: Ciudadano,
                    attributes: ['nombre', 'apellido', 'email']
                }],
                order: [
                    ['fechaCreacion', 'DESC']
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las incidencias' })
        }
    }

    // Crear una nueva incidencia
    static create = async (req: Request, res: Response) => {
        try {
            const incidencia = new Incidencia(req.body)
            await incidencia.save()
            res.status(201).json('Incidencia creada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al crear la incidencia' })
            }
        }
    }

    // Obtener una incidencia por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id, {
                include: [{
                    model: Ciudadano,
                    attributes: ['nombre', 'apellido', 'email']
                }]
            })
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({ error: error.message })
                return
            }
            
            res.json(incidencia)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener la incidencia' })
        }
    }

    // Actualizar una incidencia
    static update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id)
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            await incidencia.update(req.body)
            res.json('Incidencia actualizada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al actualizar la incidencia' })
        }
    }

    // Eliminar una incidencia
    static delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const incidencia = await Incidencia.findByPk(id)
            
            if (!incidencia) {
                const error = new Error('Incidencia no encontrada')
                res.status(404).json({ error: error.message })
                return
            }

            await incidencia.destroy()
            res.json('Incidencia eliminada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al eliminar la incidencia' })
        }
    }

    // Obtener incidencias por estado
    static getByEstado = async (req: Request, res: Response) => {
        try {
            const { estado } = req.params
            const incidencias = await Incidencia.findAll({
                where: { estadoReporte: estado },
                include: [{
                    model: Ciudadano,
                    attributes: ['nombre', 'apellido', 'email']
                }],
                order: [
                    ['fechaCreacion', 'DESC']
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las incidencias' })
        }
    }

    // Obtener incidencias por ciudadano
    static getByCiudadano = async (req: Request, res: Response) => {
        try {
            const { idCiudadano } = req.params
            const incidencias = await Incidencia.findAll({
                where: { idCiudadano },
                include: [{
                    model: Ciudadano,
                    attributes: ['nombre', 'apellido', 'email']
                }],
                order: [
                    ['fechaCreacion', 'DESC']
                ]
            })
            
            res.json(incidencias)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener las incidencias del ciudadano' })
        }
    }
} 