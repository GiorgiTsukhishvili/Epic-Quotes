import { Request, Response, response } from 'express'
import { Profile } from '../models/profile.model'

export const getProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body as { quoteId: string }

    const { userId } = req.user as { userId: string }

    const profile = await Profile.find(+userId)

    res.status(201).send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send('Profile could not be retrieved')
  }
}

export const updateProfile = (req: Request, res: Response) => {}
