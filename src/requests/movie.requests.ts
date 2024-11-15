import { body } from 'express-validator'

export const movieStoreRequest = [
  body('name-ka').notEmpty().withMessage('Name (ka) is required'),
  body('name-en').notEmpty().withMessage('Name (en) is required'),
  body('tags').notEmpty().withMessage('Tags are required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('director-ka').notEmpty().withMessage('Director (ka) is required'),
  body('director-en').notEmpty().withMessage('Director (en) is required'),
  body('description-ka').notEmpty().withMessage('Description (ka) is required'),
  body('description-en').notEmpty().withMessage('Description (en) is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('budget').notEmpty().withMessage('Budget is required'),
]

export const movieUpdateRequest = [
  body('id').notEmpty().withMessage('Movie Id is required'),
  ...movieStoreRequest,
]
