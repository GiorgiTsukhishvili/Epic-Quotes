import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader?.split(" ")[1];

  if (token === null || token === undefined) {
    res.status(401).json({ message: "Access token not provided" });
    return;
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Access token invalid" });
      return;
    }

    req.user = user;

    next();
  });
};
