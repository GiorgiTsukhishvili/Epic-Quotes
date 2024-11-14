import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prismaClient = new PrismaClient()

export const getQuotes = (req: Request, res: Response) => {}

export const getQuote = (req: Request, res: Response) => {}

export const createQuote = (req: Request, res: Response) => {}

export const updateQuote = (req: Request, res: Response) => {}

export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await prismaClient.quote.delete({ where: { id: +id } })

    res.status(204).json({ message: 'Quote was deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch quote')
  }
}
