import { prisma } from '../config/prisma'

export class Movie {
  static async find(id: number) {
    return await prisma.movie.findUnique({
      where: { id },
      include: {
        tag: { select: { id: true, tag: true } },
        quote: {
          include: {
            _count: {
              select: {
                like: true,
                comment: true,
              },
            },
          },
        },
      },
    })
  }

  static async findMany(userId: number, search: string | undefined) {
    return await prisma.movie.findMany({
      where: search
        ? {
            userId,
            OR: [
              { name: { path: ['en'], string_contains: search } },
              { name: { path: ['ka'], string_contains: search } },
            ],
          }
        : {
            userId,
          },
    })
  }

  static async create(
    data: {
      nameEn: string
      nameKa: string
      directorEn: string
      directorKa: string
      descriptionEn: string
      descriptionKa: string
      date: string
      budget: string
    },
    userId: number,
    image: string
  ) {
    return await prisma.movie.create({
      data: {
        name: {
          en: data.nameEn,
          ka: data.nameKa,
        },
        director: {
          en: data.directorEn,
          ka: data.directorKa,
        },
        description: {
          en: data.descriptionEn,
          ka: data.descriptionKa,
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
