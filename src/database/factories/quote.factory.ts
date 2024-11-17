import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'
import { Prisma } from '@prisma/client'

export const quoteFactory = async () => {
  const movie = await prisma.movie.findFirst()

  await prisma.quote.create({
    data: {
      quote: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      image: `${process.env.APP_URL}/imgs/default.png`,
      movieId: movie!.id,
    },
  })
}
