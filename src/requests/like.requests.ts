import { body } from 'express-validator'

export const storeOrDestroyLikeRequest = [
  body('quoteId').notEmpty().withMessage('User Id is required'),
]
