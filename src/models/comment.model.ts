import { prisma } from '../config/prisma'

export class Comment {
  static async create(
    data: { comment: string; quoteId: string },
    userId: number
  ) {
    return await prisma.comment.create({
      data: { quoteId: +data.quoteId, userId, comment: data.comment },
    })
  }

  static async delete(id: number) {
    await prisma.comment.delete({ where: { id } })
  }
}
