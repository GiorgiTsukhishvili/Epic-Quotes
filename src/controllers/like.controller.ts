import { Request, Response } from 'express'
import { Like } from '../models/like.model'
import { Notification } from '../models/notification.model'
import { broadcastMessageToUser } from '../routes/channel.routes'

export const storeOrDestroyLike = async (req: Request, res: Response) => {
  try {
    const data = req.body as { quoteId: string; personId: string }

    const { userId } = req.user as { userId: string }

    const like = await Like.find(+data.quoteId, +userId)

    if (userId !== data.personId) {
      await Notification.create({
        quoteId: +data.quoteId,
        personId: +userId,
        userId: +data.personId,
        isComment: false,
      })

      broadcastMessageToUser(+userId, 'New like')
    }

    if (like) {
      await Like.destroy(like.id)

      res.status(200).json({ message: 'Like removed' })
    } else {
      const newLike = await Like.create(+data.quoteId, +userId)

      res.status(200).json(newLike)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Like could not be created or destroyed')
  }
}
