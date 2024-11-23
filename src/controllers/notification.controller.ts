import { Request, Response } from 'express'
import { Notification } from '../models/notification.model'
import logger from '../config/winston'
import { HttpRequests } from '../enums/httpRequests.enum'

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const notifications = await Notification.findMany(+userId)

    res.status(HttpRequests.HTTP_OK).json(notifications)
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not fetch notifications')
  }
}

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body

    for (let id of ids) {
      await Notification.markRead(+id)
    }

    res.status(HttpRequests.HTTP_OK).json({ message: 'Notifications updated' })
  } catch (err) {
    logger.error(err)
    res
      .status(HttpRequests.HTTP_INTERNAL_SERVER_ERROR)
      .send('Could not update notifications')
  }
}
