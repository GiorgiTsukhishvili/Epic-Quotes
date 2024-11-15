import { prisma } from '../config/prisma'

export class Like {
  static async find(quoteId: number, userId: number) {
    return await prisma.like.findFirst({
      where: { quoteId, userId },
    })
  }

  static async create(quoteId: number, userId: number) {
    return await prisma.like.create({ data: { quoteId, userId } })
  }

  static async destroy(id: number) {
    await prisma.like.delete({ where: { id } })
  }
}
