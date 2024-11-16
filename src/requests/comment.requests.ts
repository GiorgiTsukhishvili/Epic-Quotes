import { body } from 'express-validator'

export const commentStoreRequest = [
  body('comment')
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage('Comment text is required'),
  body('quoteId').notEmpty().withMessage('Quote Id is required'),
  body('personId').notEmpty().withMessage('Person Id is required'),
]
