import { body } from 'express-validator'

export const notificationsFindRequest = [
  body('userId').notEmpty().withMessage('User Id is required'),
]

export const notificationUpdateRequest = [body('ids').isArray()]
