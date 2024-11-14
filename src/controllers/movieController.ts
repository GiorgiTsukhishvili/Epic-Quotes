import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export const getMovies = (req: Request, res: Response) => {};

export const getMovie = (req: Request, res: Response) => {};

export const createMovie = (req: Request, res: Response) => {};

export const updateMovie = (req: Request, res: Response) => {};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prismaClient.user.delete({ where: { id: +id } });

    res.status(204).json({ message: "Movie was deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not fetch movie genres");
  }
};

export const names = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: number };

    const genres = await prismaClient.movie.findMany({
      where: { userId: id },
      select: { name: true },
    });

    res.status(200).json(genres);
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not fetch movie genres");
  }
};

export const genres = async (_: Request, res: Response) => {
  try {
    const genres = await prismaClient.tag.findMany();

    res.status(200).json(genres);
  } catch (err) {
    console.log(err);
    res.status(500).send("Could not fetch movie genres");
  }
};
