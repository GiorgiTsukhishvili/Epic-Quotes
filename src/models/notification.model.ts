import { prisma } from '../config/prisma'

export class Notification {
  static async findMany(userId: number) {
    return prisma.notification.findMany({
      where: { userId },
      include: {
        person: {
          select: { id: true, image: true, name: true },
        },
        quote: {
          select: {
            id: true,
            movieId: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
  }

  static async markRead(id: number) {
    await prisma.notification.update({ where: { id }, data: { isNew: false } })
  }
}
