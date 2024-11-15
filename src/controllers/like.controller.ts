import { Request, Response } from 'express'
import { Like } from '../models/like.model'

export const storeOrDestroyLike = async (req: Request, res: Response) => {
  try {
    const data = req.body as { quoteId: string }

    const { userId } = req.user as { userId: string }

    const like = await Like.find(+data.quoteId, +userId)

    // Here to implement notification

    if (like) {
      await Like.destroy(like.id)

      res.status(204).json({ message: 'Like removed' })
    } else {
      const newLike = await Like.create(+data.quoteId, +userId)

      res.status(204).json(newLike)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Like could not be created or destroyed')
  }
}
