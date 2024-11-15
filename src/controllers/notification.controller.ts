import { Request, Response } from 'express'
import { Notification } from '../models/notification.model'

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const notifications = await Notification.findMany(+userId)

    res.status(204).json(notifications)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not fetch notifications')
  }
}

export const updateNotification = (req: Request, res: Response) => {}
