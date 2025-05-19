import express from 'express'
import path from 'path'
import reporteRouter from '../../Olvidados/reporteRouter'
import uploadRouter from './routes/uploadRouter'

const app = express()

// Middleware para parsear JSON
app.use(express.json())

// Servir archivos estáticos desde la carpeta public
app.use('/images', express.static(path.join(__dirname, '../public/images')))

// Rutas
app.use('/api/reportes', reporteRouter)
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