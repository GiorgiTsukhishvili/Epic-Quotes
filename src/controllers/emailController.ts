import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export const addEmail = (req: Request, res: Response) => {};

export const makeEmailPrimary = (req: Request, res: Response) => {};

export const verifyAdditionalEmail = (req: Request, res: Response) => {};

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prismaClient.quote.delete({ where: { id: +id } });

    res.status(204).json({ message: "Email was deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not fetch email");
  }
};
