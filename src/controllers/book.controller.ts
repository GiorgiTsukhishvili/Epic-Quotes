import { Request, Response } from 'express'
import { Book } from '../models/book.model'
import { Tag } from '../models/tag.model'
import { BookTag } from '../models/bookTag.model'
import logger from '../config/winston'

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string }

    const books = await Book.findMany(
      +userId,
      req.query.search as string | undefined
    )

    res.status(200).json(books)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch books')
  }
}

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const book = await Book.find(+id)

    res.status(200).json(book)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch book')
  }
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const imageUrl = `${process.env.APP_URL}/images/${req.file?.filename}`

    const { userId } = req.user as { userId: string }

    const book = await Book.create(data, +userId, imageUrl)

    const tags = JSON.parse(data.tags)

    for (const tagId of tags) {
      await BookTag.create(+book.id, +tagId)
    }

    res.status(200).json({ message: 'Book created successfully' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error creating book' })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const data = req.body

    if (req.file) {
      data.image = `${process.env.APP_URL}/images/${req.file?.filename}`
    }

    const { userId } = req.user as { userId: string }

    const book = await Book.update(+id, data, +userId, data.image)

    const tags = JSON.parse(data.tags)

    for (const tagId of tags) {
      await BookTag.create(+book.id, +tagId)
    }

    res.status(200).json(book)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error updating book' })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Book.delete(+id)

    res.status(200).json({ message: 'Book was deleted' })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch book')
  }
}

export const names = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: number }

    const genres = await Book.names(+id)

    res.status(200).json(genres)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch book genres')
  }
}

export const genres = async (_: Request, res: Response) => {
  try {
    const genres = await Tag.findMany()

    res.status(200).json(genres)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch book genres')
  }
}
