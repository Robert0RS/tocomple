import type { Request, Response } from "express"
import Ciudadano from "../models/Ciudadano"

export class CiudadanoController {
    // Obtener todos los ciudadanos
    static getAll = async (req: Request, res: Response) => {
        try {
            const ciudadanos = await Ciudadano.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                attributes: { exclude: ['contraseña'] } // Excluir datos sensibles
            })
            
            res.json(ciudadanos)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los ciudadanos' })
        }
    }

    // Crear un nuevo ciudadano
    static create = async (req: Request, res: Response) => {
        try {
            const ciudadano = new Ciudadano(req.body)
            await ciudadano.save()
            res.status(201).json('Ciudadano creado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al crear el ciudadano' })
            }
        }
    }

    // Obtener un ciudadano por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const ciudadano = await Ciudadano.findByPk(id, {
                attributes: { exclude: ['contraseña'] }
            })
            
            if (!ciudadano) {
                const error = new Error('Ciudadano no encontrado')
                res.status(404).json({ error: error.message })
                return
            }
            res.json(ciudadano)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener el ciudadano' })
        }
    }

    // Obtener un ciudadano por correo
    static getByEmail = async (req: Request, res: Response) => {
        try {
            const { email } = req.params
            const ciudadano = await Ciudadano.findOne({
                where: {
                    correo: email
                },
                attributes: { exclude: ['contraseña'] }
            })
            
            if (!ciudadano) {
                res.status(404).json({ error: 'Ciudadano no encontrado' })
                return
            }
            
            res.json(ciudadano)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener el ciudadano' })
        }
    }

    // Actualizar un ciudadano
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const ciudadano = await Ciudadano.findByPk(id)
            
            if (!ciudadano) {
                const error = new Error('Ciudadano no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            // No permitir actualizar campos sensibles directamente
            const { contraseña, ...updateData } = req.body
            await ciudadano.update(updateData)
            res.json('Ciudadano actualizado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al actualizar el ciudadano' })
            }
        }
    }

    // Eliminar un ciudadano
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const ciudadano = await Ciudadano.findByPk(id)
            
            if (!ciudadano) {
                const error = new Error('Ciudadano no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            await ciudadano.destroy()
            res.json('Ciudadano eliminado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al eliminar el ciudadano' })
        }
    }
} 