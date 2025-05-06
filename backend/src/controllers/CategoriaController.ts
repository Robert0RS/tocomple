import type { Request, Response } from "express"
import Categoria from "../models/Categoria"

export class CategoriaController {
    // Obtener todas las categorías
    static getAll = async (req: Request, res: Response) => {
        try {
            const categorias = await Categoria.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ]
            })
            
            res.json(categorias)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener las categorías'})
        }
    }

    // Crear una nueva categoría
    static create = async (req: Request, res: Response) => {
        try {
            const categoria = new Categoria(req.body)
            await categoria.save()
            res.status(201).json('Categoría creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al crear la categoría'})
        }
    }

    // Obtener una categoría por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const categoria = await Categoria.findByPk(id)
            
            if (!categoria) {
                const error = new Error('Categoría no encontrada')
                res.status(404).json({error: error.message})
                return
            }
            
            res.json(categoria)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al obtener la categoría'})
        }
    }

    // Actualizar una categoría por ID
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const categoria = await Categoria.findByPk(id)
            
            if (!categoria) {
                const error = new Error('Categoría no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            await categoria.update(req.body)
            res.json('Categoría actualizada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al actualizar la categoría'})
        }
    }

    // Eliminar una categoría por ID
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const categoria = await Categoria.findByPk(id)
            
            if (!categoria) {
                const error = new Error('Categoría no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            await categoria.destroy()
            res.json('Categoría eliminada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al eliminar la categoría'})
        }
    }
}
