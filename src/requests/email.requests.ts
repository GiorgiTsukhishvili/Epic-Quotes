import { body } from 'express-validator'

export const emailVerificationRequest = [
  body('token').notEmpty().withMessage('Token must not be empty'),
]
