import { prisma } from '../config/prisma'

export class Quote {
  static async findMany(
    pageSize: number,
    skip: number,
    search: string | undefined
  ) {
    return await prisma.quote.findMany({
      where: search
        ? search.startsWith('@')
          ? {
              movie: {
                OR: [
                  {
                    name: {
                      path: ['en'],
                      string_contains: search.slice(1),
                    },
                  },
                  {
                    name: {
                      path: ['ka'],
                      string_contains: search.slice(1),
                    },
                  },
                ],
              },
            }
          : search.startsWith('#')
            ? {
                OR: [
                  { quote: { path: ['en'], string_contains: search.slice(1) } },
                  { quote: { path: ['ka'], string_contains: search.slice(1) } },
                ],
              }
            : undefined
        : undefined,
      include: {
        like: true,
        comment: {
          include: {
            user: true,
          },
        },
        movie: {
          select: {
            id: true,
            userId: true,
            name: true,
            date: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    })
  }

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

  static async count(search: string | undefined) {
    return await prisma.quote.count({
      where: search
        ? search.startsWith('@')
          ? {
              movie: {
                OR: [
                  { name: { path: ['en'], string_contains: search.slice(1) } },
                  { name: { path: ['ka'], string_contains: search.slice(1) } },
                ],
              },
            }
          : search.startsWith('#')
            ? {
                OR: [
                  { quote: { path: ['en'], string_contains: search.slice(1) } },
                  { quote: { path: ['ka'], string_contains: search.slice(1) } },
                ],
              }
            : undefined
        : undefined,
    })
  }
}
