import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'

export const quoteFactory = async () => {
  const movie = await prisma.movie.findFirst()

  await prisma.quote.create({
    data: {
      quote: JSON.stringify({
        quoteEn: faker.book.title,
        quoteKa: faker.book.title,
      }),
      image: `${process.env.APP_URL}/imgs/default.png`,
      movieId: movie!.id,
    },
  })
}
