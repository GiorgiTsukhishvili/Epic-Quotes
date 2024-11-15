import { Request, Response } from 'express'
import { Movie } from '../models/movie.model'
import { Tag } from '../models/tag.model'
import { MovieTag } from '../models/movieTag.model'

export const getMovies = (req: Request, res: Response) => {}

export const getMovie = (req: Request, res: Response) => {}

export const createMovie = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const imageUrl = `${process.env.APP_URL}/images/${req.file?.filename}`

    const { userId } = req.user as { userId: string }

    const movie = await Movie.create(data, +userId, imageUrl)

    const tags = JSON.parse(data.tags)

    for (const tagId of tags) {
      await MovieTag.create(+movie.id, +tagId)
    }

    res.status(200).json({ message: 'Movie created successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating movie' })
  }
}

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
