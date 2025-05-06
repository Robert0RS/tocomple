import type { Request, Response } from "express"
import Dependencia from "../models/Dependencia"

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

    // Crear una nueva dependencia
    static create = async (req: Request, res: Response) => {
        try {
            const dependencia = new Dependencia(req.body)
            await dependencia.save()
            res.status(201).json('Dependencia creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al crear la dependencia'})
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
}
