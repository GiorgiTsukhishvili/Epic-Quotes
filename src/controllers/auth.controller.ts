import { Request, Response } from 'express'
import { Auth } from '../models/auth.model'
import { Email } from '../models/email.model'
import bcrypt from 'bcrypt'
import { transporter } from '../config/nodemailer'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import redisClient from '../config/redis'
import { User } from '../models/user.model'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    await Auth.register(name, email, password, lang)

    res.status(HttpRequests.HTTP_OK).json({ message: 'Email sent to user' })
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while creating the user' })
  }
}

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const user = req.user as { userId: string; name: string }

    const email = req.body.email

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    const verificationToken = crypto.randomUUID()

    const emailData = await Email.findByEmail(email)

    await redisClient.set(verificationToken, email, { EX: 1800, NX: true })

    if (!emailData?.emailVerifiedAt) {
      res
        .status(HttpRequests.HTTP_UNPROCESSABLE_ENTITY)
        .send('Email is not verified')
    }

    // Generate a temporary signed URL for email verification (30 minutes expiration)
    const baseUrl = `${process.env.FRONT_URL}/${lang}`
    const verificationLink = new URL(baseUrl)

    verificationLink.searchParams.append(
      'register-link',
      `${process.env.APP_URL}/api/v1/password-verify/${verificationToken}`
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
      html: verificationEmailTemplate(
        lang,
        verificationLink,
        user.name,
        emailTranslations[lang]['reset-text'],
        emailTranslations[lang]['reset-button'],
        emailTranslations[lang]['password-reset']
      ),
    })

    res
      .status(HttpRequests.HTTP_OK)
      .json({ message: 'Password reset email was sent' })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not send password reset email')
  }
}

export const passwordVerify = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body as { token: string; password: string }

    const cachedEmail = await redisClient.get(token)

    if (cachedEmail) {
      const emailData = await Email.findByEmail(cachedEmail)

      const hashedPassword = await bcrypt.hash(password, 10)

      await Auth.updatePassword(hashedPassword, emailData!.userId)

      await redisClient.del(token)

      res.status(HttpRequests.HTTP_OK).json({ error: 'Password updated' })
    } else {
      res
        .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: 'Password could not be updated' })
    }
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'Password could not be updated' })
  }
}

export const emailVerify = async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token: string }

    const data = await redisClient.get(token)

    const userInfo = JSON.parse(data ?? '{}') as {
      email: { email: string }
      user: {
        name: string
        password: string
        image: string
      }
    }

    const user = await User.create(
      userInfo.user.name,
      userInfo.user.password,
      userInfo.user.image
    )

    await Email.create(userInfo.email.email, +user.id)

    await redisClient.del(token)

    res.status(HttpRequests.HTTP_OK).json({ error: 'Email verified' })
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'Email could not be verified' })
  }
}

export const additionalEmailVerify = async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token: string }

    const email = await redisClient.get(token)

    if (email) {
      await Email.update(email, new Date().toISOString())

      await redisClient.del(token)

      res.status(HttpRequests.HTTP_OK).json({ error: 'Email verified' })
    } else {
      res
        .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: 'Email could not be verified' })
    }
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'Email could not be verified' })
  }
}
