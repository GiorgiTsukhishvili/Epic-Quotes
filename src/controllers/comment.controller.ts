import { Request, Response } from 'express'
import { Comment } from '../models/comment.model'
import { Quote } from '../models/quote.model'
import { prisma } from '../config/prisma'

export const createComment = async (req: Request, res: Response) => {
  try {
    const data = req.body as { comment: string; quoteId: string }

    const { userId } = req.user as { userId: string }

    const comment = await Comment.create(data, +userId)

    // Here to implement notification

    res.status(204).json(comment)
  } catch (err) {
    console.log(err)
    res.status(500).send('Comment could not be created')
  }
}
