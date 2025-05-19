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
import notificacionRouter from './routes/notificacionRouter'
import ciudadanoRouter from './routes/ciudadanoRouter'

import uploadRouter from './routes/uploadRouter'

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

// Servir archivos estáticos desde la carpeta public
app.use('/images', express.static('public/images'))

app.use('/api/budgets', budgetRouter)
app.use('/api/Usuarios', usuarioRouter)
app.use('/api/Categorias', categoriaRouter)
app.use('/api/Dependencias', dependenciaRouter)
app.use('/api/Incidencias', incidenciaRouter)
app.use('/api/Notificaciones', notificacionRouter)
app.use('/api/Ciudadanos', ciudadanoRouter)

app.use('/api/upload', uploadRouter)

// Middleware para manejar errores 404
app.use((req, res, next) => {
    console.log('404 - Ruta no encontrada:', req.method, req.url)
    res.status(404).json({ error: 'Ruta no encontrada' })
})

// Middleware para manejar errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
})

export default app