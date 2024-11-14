import { body } from 'express-validator'

export const profileUpdateRequest = [
  body('image').notEmpty().withMessage('Image is required'),
  body('name').notEmpty().withMessage('Name is required'),
]
