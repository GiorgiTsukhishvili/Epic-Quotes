import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { ExtendedAuthenticateOptionsGoogle } from '../types/global'
import { generateJWTToken } from '../utils/jwt.util'
import { Email } from '../models/email.model'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const googleUser = req.user as {
      id: string
      displayName: string
      emails: { value: string }[]
      photos: { value: string }[]
    }

    const email = await Email.findByEmail(googleUser.emails[0].value)

    if (email === undefined || email === null) {
      res
        .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: 'Email could not be found' })
      return
    }

    res.status(HttpRequests.HTTP_CREATED).json({
      user: { name: email.user.name, email: email.email },
      tokens: generateJWTToken(
        {
          userId: email.user.id,
          userName: email.user.name,
        },
        false
      ),
    })
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching google user' })
  }
}

export const googleRedirect = (
  req: Request<{ locale: string }, any, any, { type: string }>,
  res: Response,
  next: NextFunction
) => {
  const { locale } = req.params
  const { type } = req.query

  const callbackURL = `${process.env.GOOGLE_REDIRECT_URI}/${locale}?type=${type}`

  const options: ExtendedAuthenticateOptionsGoogle = {
    scope: ['profile', 'email'],
    callbackURL,
  }

  passport.authenticate('google', options)(req, res, next)
}
