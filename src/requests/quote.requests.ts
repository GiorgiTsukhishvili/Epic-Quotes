import { body } from 'express-validator'

export const quoteStoreRequest = [
  body('id').notEmpty().withMessage('ID is required'),
  body('quote-en').notEmpty().withMessage('English quote is required'),
  body('quote-ka').notEmpty().withMessage('Georgian quote is required'),
  body('image').notEmpty().withMessage('Image is required'),
]

export const quoteUpdateRequest = [
  body('id').notEmpty().withMessage('Quote Id is required'),
  ...quoteStoreRequest,
]
