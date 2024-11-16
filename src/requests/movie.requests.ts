import { body } from 'express-validator'

export const movieStoreRequest = [
  body('nameKa').notEmpty().withMessage('Name (ka) is required'),
  body('nameEn').notEmpty().withMessage('Name (en) is required'),
  body('tags').notEmpty().withMessage('Tags are required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('directorKa').notEmpty().withMessage('Director (ka) is required'),
  body('directorEn').notEmpty().withMessage('Director (en) is required'),
  body('descriptionKa').notEmpty().withMessage('Description (ka) is required'),
  body('descriptionEn').notEmpty().withMessage('Description (en) is required'),
  body('image').custom((_, { req }) => {
    if (!req.file) {
      throw new Error('Profile image is required')
    }
    return true
  }),
  body('budget').notEmpty().withMessage('Budget is required'),
]

export const movieUpdateRequest = [
  body('id').notEmpty().withMessage('Movie Id is required'),
  ...movieStoreRequest,
]
