import { Request, Response } from 'express'
import { Email } from '../models/email.model'

export const addEmail = (req: Request, res: Response) => {}

export const makeEmailPrimary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Email.makePrimary(+id)

    res.status(204).json({ message: 'Email was made primary' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not make email primary')
  }
}

export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Email.delete(+id)

    res.status(204).json({ message: 'Email was deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch email')
  }
}
