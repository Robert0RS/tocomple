import type { Request, Response } from "express"
import bcrypt from 'bcrypt';
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

    // Método de inicio de sesión HTTP
    static loginHandler = async (req: Request, res: Response): Promise<void> => {
        try {
            const { correo, password } = req.body
            const usuario = await Usuario.findOne({ where: { correo } })

            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }

            const esValido = await usuario.validarPassword(password)
            if (!esValido) {
                res.status(401).json({ error: 'Contraseña incorrecta' })
                return
            }

            res.json({ message: 'Login exitoso', usuario })
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al iniciar sesión' })
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

    // Crear un nuevo usuario
    static async create(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) {
        try {
            // Implementar la lógica de creación de usuario aquí
            // Ejemplo:
            // const user = await UserModel.create(req.body);
            // res.status(201).json(user);
            res.status(201).json({ message: 'Usuario creado (implementa la lógica aquí)' });
        } catch (error) {
            next(error);
        }
    }

    // Método para manejar el login
    static async login(correo: string, password: string): Promise<{ id: number, rol: string } | null> {
        try {
            const usuario = await Usuario.findOne({ where: { correo } });
            if (!usuario) return null;

            const isPasswordValid = await bcrypt.compare(password, usuario.passwordHash);
            if (!isPasswordValid) return null;

            return { id: usuario.id, rol: usuario.rol };
        } catch (error) {
            console.error('Error en el método login:', error);
            throw error;
        }
    }
}
