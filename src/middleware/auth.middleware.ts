import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader?.split(' ')[1]

  if (token === null || token === undefined) {
    res
      .status(HttpRequests.HTTP_UNAUTHORIZED)
      .json({ message: 'Access token not provided' })
    return
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) {
      logger.error(err)
      res
        .status(HttpRequests.HTTP_UNAUTHORIZED)
        .json({ message: 'Access token invalid' })
      return
    }

    req.user = user

    next()
  })
}
