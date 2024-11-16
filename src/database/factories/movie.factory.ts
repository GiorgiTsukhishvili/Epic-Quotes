import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'

export const movieFactory = async () => {
  const user = await prisma.user.findFirst()

  await prisma.movie.create({
    data: {
      name: JSON.stringify({
        nameEn: faker.book.title,
        nameKa: faker.book.title,
      }),
      description: JSON.stringify({
        descriptionEn: faker.definitions.commerce.product_description,
        descriptionKa: faker.definitions.commerce.product_description,
      }),
      director: JSON.stringify({
        directorEn: faker.person.fullName(),
        directorKa: faker.person.fullName(),
      }),
      date: new Date().toString(),
      budget: '10000',
      image: `${process.env.APP_URL}/imgs/default.png`,
      userId: user!.id,
    },
  })
}
