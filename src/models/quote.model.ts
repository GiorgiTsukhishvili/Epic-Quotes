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

  static async create(
    id: number,
    data: { en: string; ka: string },
    image: string
  ) {
    return await prisma.quote.create({
      data: {
        movieId: id,
        quote: data,
        image,
      },
    })
  }

  static async delete(id: number) {
    await prisma.quote.delete({ where: { id: +id } })
  }
}
