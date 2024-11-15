import { body } from 'express-validator'

export const storeOrDestroyLikeRequest = [
  body('userId').notEmpty().withMessage('User Id is required'),
]
