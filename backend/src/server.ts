import express from 'express' 
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import helmet from 'helmet' // Importar Helmet
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'
import usuarioRouter from './routes/usuarioRouter'
import categoriaRouter from './routes/categoriaRouter'
import dependenciaRouter from './routes/dependenciaRouter'
import incidenciaRouter from './routes/incidenciaRouter'
import notificacionRouter from './routes/notificacionRouter'
import ciudadanoRouter from './routes/ciudadanoRouter'
import uploadRouter from './routes/uploadRouter'
import authRouter from './routes/authRouter'

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
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false
})) // Configuración personalizada de Helmet para mayor seguridad

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
app.use('/api/auth', authRouter)

// Middleware para advertencias de Self-XSS
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    console.warn(
        '%c¡Advertencia de seguridad: no pegues codigo aqui!',
        'color: red; font-size: 20px; font-weight: bold;'
    );
    next();
})

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
