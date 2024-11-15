import { prisma } from '../config/prisma'

export class Movie {
  static async delete(id: number) {
    await prisma.movie.delete({ where: { id: +id } })
  }

  static async names(userId: number) {
    await prisma.movie.findMany({
      where: { userId },
      select: { name: true },
    })
  }
}
