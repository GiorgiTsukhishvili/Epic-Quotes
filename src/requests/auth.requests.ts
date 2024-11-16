import { body } from 'express-validator'

export const loginRequest = [
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Password must be at least 6 characters long')
    .notEmpty()
    .withMessage('Password is required'),
  body('remember')
    .optional()
    .isBoolean()
    .withMessage('Remember must be a boolean value'),
]

export const newPasswordRequest = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .matches(/^[a-z0-9_\-]+$/)
    .withMessage(
      'Password must contain only lowercase letters, numbers, underscores, or hyphens'
    )
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 and 15 characters long'),

  body('password_confirmation')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('token').notEmpty().withMessage('Token is required'),
]

export const passwordResetRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
]

export const registerRequest = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 15 })
    .withMessage('Name must be between 3 and 15 characters long')
    .matches(/^[a-z0-9_\-]+$/)
    .withMessage(
      'Name must contain only lowercase letters, numbers, underscores, or hyphens'
    ),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .matches(/^[a-z0-9_\-]+$/)
    .withMessage(
      'Password must contain only lowercase letters, numbers, underscores, or hyphens'
    )
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 and 15 characters long'),
  body('password_confirmation')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
]

export const refreshTokenRequest = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
]
