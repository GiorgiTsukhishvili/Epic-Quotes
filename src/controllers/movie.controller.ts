import { Request, Response } from 'express'
import { Movie } from '../models/movie.mode'
import { Tag } from '../models/tag.mode'

export const getMovies = (req: Request, res: Response) => {}

export const getMovie = (req: Request, res: Response) => {}

export const createMovie = (req: Request, res: Response) => {}

export const updateMovie = (req: Request, res: Response) => {}

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Movie.delete(+id)

    res.status(204).json({ message: 'Movie was deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch movie')
  }
}

export const names = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: number }

    const genres = await Movie.names(+id)

    res.status(200).json(genres)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch movie genres')
  }
}

export const genres = async (_: Request, res: Response) => {
  try {
    const genres = await Tag.findMany()

    res.status(200).json(genres)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch movie genres')
  }
}
