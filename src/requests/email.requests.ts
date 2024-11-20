import { body } from 'express-validator'

export const emailVerificationRequest = [
  body('token').notEmpty().withMessage('Token must not be empty'),
]

export const addAdditionalEmailRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
]

export const additionalEmailVerifyRequest = [
  body('token').notEmpty().withMessage('Token is required'),
]
