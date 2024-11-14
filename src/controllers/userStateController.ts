import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateJWTToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      remember,
    }: { email: string; password: string; remember: boolean } = req.body;

    const selectedEmail = await prisma.email.findUnique({
      where: { email: email },
      include: { user: true },
    });

    if (!selectedEmail) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = bcrypt.compare(
      password,
      selectedEmail.user.password!
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    res.status(200).json({
      user: { name: selectedEmail.user.name, email: selectedEmail.email },
      tokens: generateJWTToken(
        {
          userId: selectedEmail.user.id,
          userName: selectedEmail.user.name,
        },
        remember
      ),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

export const logoOut = (req: Request, res: Response) => {};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  jwt.verify(
    refreshToken,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        console.log(refreshToken);
        res.status(401).json({ message: "Refresh token invalid" });
        return;
      }

      const { id, name } = user as { id: number; name: string };

      res.status(201).json({
        tokens: generateJWTToken({
          userId: id,
          userName: name,
        }),
      });
    }
  );
};

export const userInfo = (req: Request, res: Response) => {};
