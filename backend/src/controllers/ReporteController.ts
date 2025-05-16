import type { Request, Response } from "express"
import Reporte from "../models/Reporte"
import { Op } from "sequelize"

export class ReporteController {
    // Obtener todos los reportes
    static getAll = async (req: Request, res: Response) => {
        try {
            const reportes = await Reporte.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                include: [
                    { model: Reporte.associations.ciudadano.target }
                ]
            })
            
            res.json(reportes)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener los reportes'})
        }
    }

    // Crear un nuevo reporte
    static create = async (req: Request, res: Response) => {
        try {
            const reporte = new Reporte(req.body)
            await reporte.save()

            // Cargar el ciudadano
            await reporte.reload({
                include: [{ model: Reporte.associations.ciudadano.target }]
            })

            res.status(201).json('Reporte creado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: 'Hubo un error al crear el reporte'})
            }
        }
    }

    // Obtener un reporte por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const reporte = await Reporte.findByPk(id, {
                include: [
                    { model: Reporte.associations.ciudadano.target }
                ]
            })
            
            if (!reporte) {
                const error = new Error('Reporte no encontrado')
                res.status(404).json({error: error.message})
                return
            }
            
            res.json(reporte)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener el reporte'})
        }
    }

    // Actualizar un reporte por ID
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const reporte = await Reporte.findByPk(id)
            
            if (!reporte) {
                const error = new Error('Reporte no encontrado')
                res.status(404).json({error: error.message})
                return
            }

            await reporte.update(req.body)
            res.json('Reporte actualizado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: 'Hubo un error al actualizar el reporte'})
            }
        }
    }

    // Eliminar un reporte por ID
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const reporte = await Reporte.findByPk(id)
            
            if (!reporte) {
                const error = new Error('Reporte no encontrado')
                res.status(404).json({error: error.message})
                return
            }

            await reporte.destroy()
            res.json('Reporte eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al eliminar el reporte'})
        }
    }

    // Obtener reportes por estado
    static getByEstado = async (req: Request, res: Response) => {
        try {
            const { estado } = req.params
            const reportes = await Reporte.findAll({
                where: { estado },
                order: [['fechaCreacion', 'DESC']],
                include: [
                    { model: Reporte.associations.ciudadano.target }
                ]
            })
            
            res.json(reportes)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener los reportes por estado'})
        }
    }

    // Obtener reportes por ciudadano
    static getByCiudadano = async (req: Request, res: Response) => {
        try {
            const { idCiudadano } = req.params
            const reportes = await Reporte.findAll({
                where: { idCiudadano },
                order: [['fechaCreacion', 'DESC']],
                include: [
                    { model: Reporte.associations.ciudadano.target }
                ]
            })
            
            res.json(reportes)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener los reportes por ciudadano'})
        }
    }
} 