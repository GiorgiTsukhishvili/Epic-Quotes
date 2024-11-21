import { prisma } from '../config/prisma'

export class Book {
  static async find(id: number) {
    return await prisma.book.findUnique({
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
    return await prisma.book.findMany({
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
      authorEn: string
      authorKa: string
      descriptionEn: string
      descriptionKa: string
      date: string
      budget: string
    },
    userId: number,
    image: string
  ) {
    return await prisma.book.create({
      data: {
        name: {
          en: data.nameEn,
          ka: data.nameKa,
        },
        author: {
          en: data.authorEn,
          ka: data.authorKa,
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

  static async update(
    id: number,
    data: {
      nameEn: string
      nameKa: string
      authorEn: string
      authorKa: string
      descriptionEn: string
      descriptionKa: string
      date: string
      budget: string
    },
    userId: number,
    image: string
  ) {
    return await prisma.book.update({
      where: { id },
      data: {
        name: {
          en: data.nameEn,
          ka: data.nameKa,
        },
        author: {
          en: data.authorEn,
          ka: data.authorKa,
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
    await prisma.book.delete({ where: { id: +id } })
  }

  static async names(userId: number) {
    await prisma.book.findMany({
      where: { userId },
      select: { name: true },
    })
  }
}
