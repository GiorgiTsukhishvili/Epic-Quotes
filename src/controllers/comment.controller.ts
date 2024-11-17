import { Request, Response } from 'express'
import { Comment } from '../models/comment.model'
import { Notification } from '../models/notification.model'

export const createComment = async (req: Request, res: Response) => {
  try {
    const data = req.body as {
      comment: string
      quoteId: string
      personId: string
    }

    const { userId } = req.user as { userId: string }

    const comment = await Comment.create(data, +userId)

    if (userId !== data.personId) {
      await Notification.create({
        quoteId: +data.quoteId,
        personId: +userId,
        userId: +data.personId,
        isComment: false,
      })
    }

    res.status(200).json(comment)
  } catch (err) {
    console.log(err)
    res.status(500).send('Comment could not be created')
  }
}
