import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateJWTToken } from '../utils/jwt.util'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'
import { User } from '../models/user.model'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      remember,
    }: { email: string; password: string; remember: boolean } = req.body

    const selectedEmail = await prisma.email.findUnique({
      where: { email: email },
      include: { user: true },
    })

    if (!selectedEmail) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const isPasswordValid = bcrypt.compare(
      password,
      selectedEmail.user.password!
    )

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Incorrect password' })
      return
    }

    res.status(HttpRequests.HTTP_OK).json({
      user: { name: selectedEmail.user.name, email: selectedEmail.email },
      tokens: generateJWTToken(
        {
          userId: selectedEmail.user.id,
          userName: selectedEmail.user.name,
        },
        remember
      ),
    })
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while logging in the user' })
  }
}

export const logoOut = (_: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  })

  res.status(HttpRequests.HTTP_OK).json({ message: 'User logged out' })
}

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        res
          .status(HttpRequests.HTTP_UNAUTHORIZED)
          .json({ message: 'Refresh token invalid' })
        return
      }

      const { id, name } = user as { id: number; name: string }

      res.status(HttpRequests.HTTP_OK).json({
        tokens: generateJWTToken({
          userId: id,
          userName: name,
        }),
      })
    }
  )
}

export const userInfo = async (req: Request, res: Response) => {
  try {
    const user = req.user as { userId: string }

    const userInfo = await User.find(+user.userId)

    res.status(HttpRequests.HTTP_OK).json({
      user: userInfo,
    })
  } catch (error) {
    logger.error(error)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while getting user information' })
  }
}
