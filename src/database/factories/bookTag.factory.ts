import { prisma } from '../../config/prisma'

export const bookTagFactory = async (bookId: number, tagId: number) =>
  await prisma.bookTag.create({ data: { bookId, tagId } })
