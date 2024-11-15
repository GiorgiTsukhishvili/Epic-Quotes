import { prisma } from '../config/prisma'

export class Movie {
  static async create(
    data: {
      'name-en': string
      'name-ka': string
      'director-en': string
      'director-ka': string
      'description-en': string
      'description-ka': string
      date: string
      budget: string
    },
    userId: number,
    image: string
  ) {
    return await prisma.movie.create({
      data: {
        name: {
          en: data['name-en'],
          ka: data['name-ka'],
        },
        director: {
          en: data['director-en'],
          ka: data['director-ka'],
        },
        description: {
          en: data['description-en'],
          ka: data['description-ka'],
        },
        image,
        userId,
        date: data.date,
        budget: data.budget,
      },
    })
  }

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
