import { prisma } from '../config/prisma'

export class MovieTag {
  static async create(movieId: number, tagId: number) {
    await prisma.movieTag.create({
      data: {
        movieId,
        tagId,
      },
    })
  }
}
