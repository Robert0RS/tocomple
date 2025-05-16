import { Router } from 'express'
import { UploadController, upload } from '../controllers/UploadController'
import type { RequestHandler } from 'express'

const router = Router()

// Ruta para subir imágenes
router.post('/', 
  upload.single('image') as RequestHandler,
  UploadController.uploadImage as RequestHandler
)

// Ruta de prueba para verificar que el router está funcionando
router.get('/test', (req, res) => {
  res.json({ message: 'Upload router is working' })
})

router.delete('/', UploadController.deleteImage)

export default router 