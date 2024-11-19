import { Request, Response } from 'express'
import { generateJWTToken } from '../utils/jwt'
import { Auth } from '../models/auth.model'
import { Email } from '../models/email.model'
import bcrypt from 'bcrypt'
import { transporter } from '../config/nodemailer'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import redisClient from '../config/redis'
import { User } from '../models/user.model'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    await Auth.register(name, email, password, lang)

    res.status(201).json({ message: 'Email sent to user' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while creating the user' })
  }
}

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const user = req.user as { userId: string; name: string }

    const email = req.body.email

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    const verificationToken = crypto.randomUUID()

    const emailData = await Email.findByEmail(email)

    if (!emailData?.emailVerifiedAt) {
      res.status(422).send('Email is not verified')
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

    res.status(200).json({ message: 'Password reset email was sent' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not send password reset email')
  }
}

export const passwordVerify = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body as { token: string; password: string }

    const email = await Email.find(token)

    const hashedPassword = await bcrypt.hash(password, 10)

    await Auth.updatePassword(hashedPassword, email!.userId)

    res.status(201).json({ error: 'Password updated' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Password could not be updated' })
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

    await Email.create(userInfo.email.email, +user.id, token)

    await redisClient.del(token)

    res.status(201).json({ error: 'Email verified' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Email could not be verified' })
  }
}
