import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpRequests } from '../enums/httpRequests.enum'

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res
      .status(HttpRequests.HTTP_UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() })
    return
  }

  next()
}
