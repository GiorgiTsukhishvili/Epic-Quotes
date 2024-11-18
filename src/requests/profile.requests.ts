import { body } from 'express-validator'

export const profileUpdateRequest = [
  body('image').custom((value, { req }) => {
    if (typeof value === 'string') {
      return true
    }

    if (!req.file) {
      throw new Error('Profile image is required')
    }

    return true
  }),
  body('name').notEmpty().withMessage('Name is required'),
]
