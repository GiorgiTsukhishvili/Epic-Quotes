import { prisma } from '../../config/prisma'
import logger from '../../config/winston'
import { bookTagFactory } from '../factories/bookTag.factory'

export const bookTagSeeder = async () => {
  try {
    const book = await prisma.book.findFirst()

    const tags = await prisma.tag.findMany()

    for (let tag of tags) {
      await bookTagFactory(book!.id, tag.id)
    }

    logger.info('Book tags  seed is complete')
  } catch (err) {
    logger.error(err)
  }
}
