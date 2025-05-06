import express from 'express' 
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import usuarioRouter from './routes/usuarioRouter'
import categoriaRouter from './routes/categoriaRouter'
import dependenciaRouter from './routes/dependenciaRouter'
import incidenciaRouter from './routes/incidenciaRouter'

async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log (colors.blue.bold('Conexión exitosa a la BD'))
    } catch (error) {
        console.log (colors.red.bold('Falló la conexión a la BD'))
        
    }
}
connectDB()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())


app.use('/api/budgets', budgetRouter)
app.use('/api/Usuarios', usuarioRouter)
app.use('/api/Categorias', categoriaRouter)
app.use('/api/Dependencias', dependenciaRouter)
app.use('/api/Incidencias', incidenciaRouter)

export default app