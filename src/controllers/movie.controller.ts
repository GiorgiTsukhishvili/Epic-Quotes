import { Request, Response } from 'express'
import { Movie } from '../models/movie.model'
import { Tag } from '../models/tag.model'
import { MovieTag } from '../models/movieTag.model'

export const getMovies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string }

    const movies = await Movie.findMany(
      +userId,
      req.query.search as string | undefined
    )

    res.status(200).json(movies)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch movies')
  }
}

export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const movie = await Movie.find(+id)

    res.status(200).json(movie)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch movie')
  }
}

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

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const data = req.body

    if (req.file) {
      data.image = `${process.env.APP_URL}/images/${req.file?.filename}`
    }

    const { userId } = req.user as { userId: string }

    const movie = await Movie.update(+id, data, +userId, data.image)

    const tags = JSON.parse(data.tags)

    for (const tagId of tags) {
      await MovieTag.create(+movie.id, +tagId)
    }

    res.status(200).json(movie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating movie' })
  }
}

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Movie.delete(+id)

    res.status(200).json({ message: 'Movie was deleted' })
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
