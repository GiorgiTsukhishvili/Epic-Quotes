import { Request, Response } from 'express'
import { Notification } from '../models/notification.model'
import logger from '../config/winston'

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const notifications = await Notification.findMany(+userId)

    res.status(200).json(notifications)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not fetch notifications')
  }
}

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body

    for (let id of ids) {
      await Notification.markRead(+id)
    }

    res.status(200).json({ message: 'Notifications updated' })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Could not update notifications')
  }
}
