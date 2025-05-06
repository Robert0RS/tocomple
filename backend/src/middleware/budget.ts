import type { Request, Response, NextFunction } from 'express'

export const validateBudgetId = (req: Request, res: Response, next: NextFunction) => {
    console.log('desde budget.ts')

    next()

}