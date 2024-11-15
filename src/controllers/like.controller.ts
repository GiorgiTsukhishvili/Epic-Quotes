import { Request, Response } from 'express'
import { Like } from '../models/like.model'

export const storeOrDestroyLike = async (req: Request, res: Response) => {
  try {
    const data = req.body as { quoteId: string }

    const { userId } = req.user as { userId: string }

    const like = await Like.createOrDestroy(+data.quoteId, +userId)

    // Here to implement notification

    if (like) {
      res.status(204).json(like)
    } else {
      res.status(204).json({ message: 'Like removed' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Like could not be created or destroyed')
  }
}
