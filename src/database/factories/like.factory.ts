import { prisma } from '../../config/prisma'

export const likeFactory = async () => {
  const quote = await prisma.quote.findFirst()
  const user = await prisma.user.findFirst()

  await prisma.like.create({
    data: {
      userId: user!.id,
      quoteId: quote!.id,
    },
  })
}
