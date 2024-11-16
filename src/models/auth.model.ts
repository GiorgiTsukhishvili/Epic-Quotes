import { transporter } from '../config/nodemailer'
import { prisma } from '../config/prisma'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import bcrypt from 'bcrypt'
import { Email } from './email.model'

export class Register {
  static async register(
    name: string,
    email: string,
    password: string,
    lang: 'ka' | 'en'
  ) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        image: `${process.env.APP_URL}/imgs/default.png`,
      },
    })

    const verificationToken = crypto.randomUUID()

    await Email.create(email, +user.id, verificationToken)

    // Generate a temporary signed URL for email verification (30 minutes expiration)
    const baseUrl = `${process.env.FRONT_URL}/${lang}`
    const verificationLink = new URL(baseUrl)

    verificationLink.searchParams.append(
      'register-link',
      `${process.env.APP_URL}/api/v1/verify/${verificationToken}`
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
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

    return user
  }
}
