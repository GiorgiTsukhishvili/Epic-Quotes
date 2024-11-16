import { Request, Response } from 'express'
import { Quote } from '../models/quote.model'

export const getQuotes = (req: Request, res: Response) => {}

export const getQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const quote = await Quote.find(+id)

    res.status(204).json(quote)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch quote')
  }
}

export const createQuote = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const imageUrl = `${process.env.APP_URL}/images/${req.file?.filename}`

    const quote = await Quote.create(
      +data.id,
      {
        quoteEn: data.quoteEn,
        quoteKa: data.quoteKa,
      },
      imageUrl
    )

    res.status(204).json(quote)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not create quote')
  }
}

export const updateQuote = (req: Request, res: Response) => {}

export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Quote.delete(+id)

    res.status(204).json({ message: 'Quote was deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch quote')
  }
}
