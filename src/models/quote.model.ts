import { prisma } from '../config/prisma'

export class Quote {
  static async find(id: number) {
    return await prisma.quote.findUnique({
      where: { id },
      include: {
        like: { include: { user: true } },
        comment: {
          include: { user: true },
        },
      },
    })
  }

  static async delete(id: number) {
    await prisma.quote.delete({ where: { id: +id } })
  }
}
