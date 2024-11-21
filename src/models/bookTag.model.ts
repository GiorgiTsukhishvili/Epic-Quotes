import { prisma } from '../config/prisma'

export class BookTag {
  static async create(bookId: number, tagId: number) {
    await prisma.bookTag.create({
      data: {
        bookId,
        tagId,
      },
    })
  }
}
