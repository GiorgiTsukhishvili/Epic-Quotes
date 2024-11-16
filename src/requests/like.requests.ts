import { body } from 'express-validator'

export const storeOrDestroyLikeRequest = [
  body('quoteId').notEmpty().withMessage('Quote Id is required'),
  body('personId').notEmpty().withMessage('Person Id is required'),
]
