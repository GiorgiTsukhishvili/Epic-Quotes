import { Request, Response } from 'express'
import { Profile } from '../models/profile.model'

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string }

    const profile = await Profile.find(+userId)

    res.status(201).send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send('Profile could not be retrieved')
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user as { userId: string }

    if (req.file) {
      req.body.image = `${process.env.APP_URL}/images/${req.file?.filename}`
    }

    const data = req.body

    const profile = await Profile.update(
      +userId,
      data as { image: string; name: string }
    )

    res.status(201).send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send('Profile could not be updated')
  }
}
