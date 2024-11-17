import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'

export const commentFactory = async () => {
  const quote = await prisma.quote.findFirst()
  const user = await prisma.user.findFirst()

  await prisma.comment.create({
    data: {
      userId: user!.id,
      quoteId: quote!.id,
      comment: faker.book.title(),
    },
  })
}
