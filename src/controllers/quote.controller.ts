import { Request, Response } from 'express'
import { Quote } from '../models/quote.model'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const { search, pageSize = 10, page = 1 } = req.query

    const skip = (+page - 1) * +pageSize

    const quotes = await Quote.findMany(
      +pageSize,
      +skip,
      search as string | undefined
    )

    const totalCount = await Quote.count(search as string | undefined)

    const totalPages = Math.ceil(totalCount / +pageSize)

    res.status(HttpRequests.HTTP_OK).json({
      data: quotes,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize,
      },
    })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not fetch quotes')
  }
}

export const getQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const quote = await Quote.find(+id)

    res.status(HttpRequests.HTTP_OK).json(quote)
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not fetch quote')
  }
}

export const createQuote = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const imageUrl = `${process.env.APP_URL}/images/${req.file?.filename}`

    const quote = await Quote.create(
      +data.id,
      {
        en: data.quoteEn,
        ka: data.quoteKa,
      },
      imageUrl
    )

    res.status(HttpRequests.HTTP_CREATED).json(quote)
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not create quote')
  }
}

export const updateQuote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const data = req.body

    if (req.file) {
      data.image = `${process.env.APP_URL}/images/${req.file?.filename}`
    }

    const quote = await Quote.update(
      +id,
      +data.id,
      {
        en: data.quoteEn,
        ka: data.quoteKa,
      },
      data.image
    )

    res.status(HttpRequests.HTTP_OK).json(quote)
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not update quote')
  }
}

export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Quote.delete(+id)

    res.status(HttpRequests.HTTP_OK).json({ message: 'Quote was deleted' })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not fetch quote')
  }
}
