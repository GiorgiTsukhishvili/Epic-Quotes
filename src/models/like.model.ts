import { prisma } from '../config/prisma'

export class Like {
  static async createOrDestroy(quoteId: number, userId: number) {
    const like = await prisma.like.findFirst({
      where: { quoteId, userId },
    })

    if (like) {
      await prisma.like.delete({ where: { id: like.id } })

      return null
    } else {
      return await prisma.like.create({ data: { quoteId, userId } })
    }
  }
}
