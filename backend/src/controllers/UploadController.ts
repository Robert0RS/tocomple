import type { Request, Response } from "express"
import multer, { FileFilterCallback } from "multer"
import path from "path"
import fs from "fs"

// Extender el tipo Request para incluir el archivo
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/images')
    console.log('Upload directory:', uploadDir)
    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      console.log('Creating upload directory...')
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = uniqueSuffix + path.extname(file.originalname)
    console.log('Generated filename:', filename)
    cb(null, filename)
  }
})

// Configurar el filtro de archivos
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  console.log('File type:', file.mimetype)
  // Aceptar solo imágenes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten archivos de imagen'))
  }
}

// Crear el middleware de multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

export class UploadController {
  static uploadImage = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
      console.log('Upload request received')
      console.log('Request headers:', req.headers)
      
      if (!req.file) {
        console.log('No file uploaded')
        res.status(400).json({ error: 'No se ha subido ningún archivo' })
        return
      }

      console.log('File uploaded:', req.file)

      // Construir la URL de la imagen
      const imageUrl = `/images/${req.file.filename}`
      console.log('Image URL:', imageUrl)

      res.status(200).json({
        message: 'Imagen subida correctamente',
        imageUrl: imageUrl
      })
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      res.status(500).json({ error: 'Error al subir la imagen' })
    }
  }

  static deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageUrl } = req.body
      
      if (!imageUrl) {
        res.status(400).json({ error: 'No se proporcionó la URL de la imagen' })
        return
      }

      // Extraer el nombre del archivo de la URL
      const filename = path.basename(imageUrl)
      const filePath = path.join(__dirname, '../../public/images', filename)

      // Verificar si el archivo existe
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'La imagen no existe' })
        return
      }

      // Eliminar el archivo
      fs.unlinkSync(filePath)
      console.log('Imagen eliminada:', filePath)

      res.status(200).json({
        message: 'Imagen eliminada correctamente'
      })
    } catch (error) {
      console.error('Error al eliminar la imagen:', error)
      res.status(500).json({ error: 'Error al eliminar la imagen' })
    }
  }
} 