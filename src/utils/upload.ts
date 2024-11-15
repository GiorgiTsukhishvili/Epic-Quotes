import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'
import { randomUUID } from 'crypto'

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

const storage = multer.diskStorage({
  destination: (
    _: Request,
    __: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, path.join(__dirname, '../../public/images')) // Set the upload directory
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // Generate a unique filename with a timestamp
    const uniqueSuffix = `${randomUUID()}-${file.originalname}`

    cb(null, uniqueSuffix)
  },
})

// File filter to validate file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Set the file size limit to 5MB
  },
})

export default upload
