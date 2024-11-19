import { transporter } from '../config/nodemailer'
import { prisma } from '../config/prisma'
import { verificationEmailTemplate } from '../templates/verification-email.template'
import { emailTranslations } from '../translations/email'
import bcrypt from 'bcrypt'
import { Email } from './email.model'
import redisClient from '../config/redis'

export class Auth {
  static async register(
    name: string,
    email: string,
    password: string,
    lang: 'ka' | 'en'
  ) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const verificationToken = crypto.randomUUID()

    console.log(verificationToken)

    await redisClient.set(
      verificationToken,
      JSON.stringify({
        email: { email },
        user: {
          name,
          password: hashedPassword,
          image: `${process.env.APP_URL}/imgs/default.png`,
        },
      }),
      { EX: 1800, NX: true }
    )

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
        name,
        emailTranslations[lang]['joining-text'],
        emailTranslations[lang]['verify-button'],
        emailTranslations[lang]['account-verification']
      ),
    })
  }

  static async updatePassword(password: string, userId: number) {
    await prisma.user.update({ where: { id: userId }, data: { password } })
  }
}
