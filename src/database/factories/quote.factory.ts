import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'
import { Prisma } from '@prisma/client'

export const quoteFactory = async () => {
  const book = await prisma.book.findFirst()

  await prisma.quote.create({
    data: {
      quote: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      image: `${process.env.APP_URL}/imgs/default.png`,
      bookId: book!.id,
    },
  })
}
