import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetController{
    //Obtener todos los productos
    static getALL = async (req:Request, res:Response) =>{
        try {
            const budgets = await Budget.findAll({
                //ORDENAR
                order: [
                    ['createdAt', 'DESC']
                    //['name', 'ASC']
                    //['name', 'DESC']
                    //['amount', 'ASC']
                ],
                // TODO: Filtrar por el usuario autenticado
                /*
                limit: 2,
                where: {
                    name: 'Vacaciones'
                }
                */
            })
            
            res.json(budgets)
        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //crear producto
    static create = async (req:Request, res:Response) =>{
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Presupuesto Creado Correctamente')
            //console.log(req.body)
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
        
    }

    //Obtener un producto por ID
    static getById = async (req:Request, res:Response) =>{
        try {
            console.log(req.params.id)
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if(!budget){
                const error = new Error(' Presupuesto no encontrado')
                res.status(404).json({error:error.message})
                return 
            }
            res.json(budget)
        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
            
        }
        
    }

    static updateById = async (req:Request, res:Response) =>{
        try {
            console.log(req.params.id)
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            
            if(!budget){
                const error = new Error(' Presupuesto no encontrado')
                res.status(404).json({error:error.message})
                return 
            }
            // Escribir los cambios del body
            await budget.update(req.body)
            res.json('Presupuesto actualizado correctamente')
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
            
        }
    }

    static deleteById = async (req:Request, res:Response) =>{
        try {
            console.log(req.params.id)
            const { id } = req.params
            const budget = await Budget.findByPk(id)
            if(!budget){
                const error = new Error(' Presupuesto no encontrado')
                res.status(404).json({error:error.message})
                return 
            }
            await budget.destroy()
            res.json('Presupuesto eliminado correctamente')
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
            
        }
    }

}