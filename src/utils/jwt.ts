import jwt from "jsonwebtoken";

export const generateJWTToken = (
  userInfo: {
    userId: number;
    userName: string;
  },
  remember?: boolean
) => {
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: remember ? "256h" : process.env.JWT_EXPIRATION_DATE,
  });

  const refreshToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.JWT_REMEMBER_TOKEN_EXPIRATION_DATE,
  });

  return { accessToken, refreshToken };
};
