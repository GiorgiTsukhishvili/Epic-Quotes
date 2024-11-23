import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateJWTToken = (
  userInfo: {
    userId: number
    userName: string
  },
  remember?: boolean
) => {
  const jwtTokenExpirationDate = process.env.JWT_TOKEN_EXPIRATION_DATE
  const jwtTokenRefreshExpirationDate =
    process.env.JWT_REMEMBER_TOKEN_EXPIRATION_DATE

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: remember ? '256h' : +(jwtTokenExpirationDate ?? 100) * 1000,
  })

  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: +(jwtTokenRefreshExpirationDate ?? 1000) * 1000,
  })

  const now = new Date().getTime()

  return {
    accessToken,
    refreshToken,
    tokenExpiresIn: new Date(
      now + +(jwtTokenExpirationDate ?? 100) * 1000
    ).getTime(),
    rememberTokenExpiresIn: new Date(
      now + +(jwtTokenRefreshExpirationDate ?? 1000) * 1000
    ).getTime(),
  }
}

export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
  } catch (error) {
    return null
  }
}
