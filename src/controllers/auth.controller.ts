import { Request, Response } from 'express'
import { generateJWTToken } from '../utils/jwt'
import { Auth } from '../models/auth.model'
import { Email } from '../models/email.model'
import bcrypt from 'bcrypt'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    const lang: 'ka' | 'en' = req.body.lang ?? 'en'

    const user = await Auth.register(name, email, password, lang)

    res.status(201).json({
      user: { name, email },
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

    const email = await Email.find(token)

    if (email?.emailVerifiedAt) {
      res.status(422).json({ error: 'Email is already verified' })
    } else {
      await Email.update(email!.email, new Date().toString())

      res.status(201).json({ error: 'Email verified' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Email could not be verified' })
  }
}
