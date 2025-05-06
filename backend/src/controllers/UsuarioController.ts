import type { Request, Response } from "express"
import Usuario from "../models/Usuario"

export class UsuarioController {
    // Obtener todos los usuarios
    static getAll = async (req: Request, res: Response) => {
        try {
            const usuarios = await Usuario.findAll({
                order: [
                    ['fechaCreacion', 'DESC']
                ],
                attributes: { exclude: ['passwordHash', 'refreshToken'] } // Excluir datos sensibles
            })
            
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los usuarios' })
        }
    }

    // Crear un nuevo usuario
    static create = async (req: Request, res: Response) => {
        try {
            const usuario = new Usuario(req.body)
            await usuario.save()
            res.status(201).json('Usuario creado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al crear el usuario' })
            }
        }
    }

    // Obtener un usuario por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id, {
                attributes: { exclude: ['passwordHash', 'refreshToken'] }
            })
            
            if (!usuario) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message })
                return
            }
            res.json(usuario)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener el usuario' })
        }
    }

    // Actualizar un usuario
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)
            
            if (!usuario) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            // No permitir actualizar campos sensibles directamente
            const { passwordHash, refreshToken, ...updateData } = req.body
            await usuario.update(updateData)
            res.json('Usuario actualizado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Hubo un error al actualizar el usuario' })
            }
        }
    }

    // Eliminar un usuario (soft delete)
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)
            
            if (!usuario) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            // Soft delete - marcar como inactivo
            await usuario.update({ activo: false })
            res.json('Usuario desactivado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al desactivar el usuario' })
        }
    }

    // Obtener usuarios por dependencia
    static getByDependencia = async (req: Request, res: Response) => {
        try {
            const { idDependencia } = req.params
            const usuarios = await Usuario.findAll({
                where: {
                    idDependencia,
                    activo: true
                },
                attributes: { exclude: ['passwordHash', 'refreshToken'] }
            })
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los usuarios de la dependencia' })
        }
    }
}
