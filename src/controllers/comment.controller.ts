import { Request, Response } from 'express'
import { Comment } from '../models/comment.model'
import { Notification } from '../models/notification.model'
import { broadcastMessageToUser } from '../routes/channel.routes'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

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

      broadcastMessageToUser(+userId, 'New comment')
    }

    res.status(HttpRequests.HTTP_CREATED).json(comment)
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Comment could not be created')
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Comment.delete(+id)

    res.status(HttpRequests.HTTP_OK).json({ message: 'Comment was deleted' })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Comment could not be created')
  }
}
