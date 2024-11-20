import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'
import { Prisma } from '@prisma/client'

export const movieFactory = async () => {
  const user = await prisma.user.findFirst()

  await prisma.movie.create({
    data: {
      name: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      description: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      director: {
        en: faker.person.fullName(),
        ka: faker.person.fullName(),
      } as Prisma.JsonObject,
      date: new Date().toISOString(),
      budget: '10000',
      image: `${process.env.APP_URL}/imgs/default.png`,
      userId: user!.id,
    },
  })
}
