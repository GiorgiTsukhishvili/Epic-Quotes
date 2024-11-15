import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import { generateJWTToken } from '../utils/jwt'
import { transporter } from '../config/nodemailer'

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        image: `${process.env.APP_URL}/imgs/default.png`,
      },
    })

    const verificationToken = crypto.randomUUID()

    await prisma.email.create({
      data: {
        email,
        is_primary: true,
        userId: user.id,
        verificationToken,
      },
    })

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    // Generate a temporary signed URL for email verification (30 minutes expiration)
    const baseUrl = `${process.env.FRONT_URL}/${lang}`
    const verificationLink = new URL(baseUrl)

    verificationLink.searchParams.append(
      'register-link',
      `${process.env.APP_URL}/api/v1/verify/${verificationToken}`
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Account Verification',
      html: verificationEmailTemplate(
        lang,
        verificationLink,
        user.name,
        emailTranslations[lang]['joining-text'],
        emailTranslations[lang]['verify-button'],
        emailTranslations[lang]['account-verification']
      ),
    })

    res.status(201).json({
      user: { name: user.name, email: email.email },
      tokens: generateJWTToken(
        {
          userId: user.id,
          userName: user.name,
        },
        false
      ),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while creating the user' })
  }
}

export const passwordReset = (req: Request, res: Response) => {}

export const passwordVerify = (req: Request, res: Response) => {}

export const emailVerify = (req: Request, res: Response) => {}
