import { prisma } from '../../config/prisma'
import logger from '../../config/winston'
import { movieTagFactory } from '../factories/movieTag.factory'

export const movieTagSeeder = async () => {
  try {
    const movie = await prisma.movie.findFirst()

    const tags = await prisma.tag.findMany()

    for (let tag of tags) {
      await movieTagFactory(movie!.id, tag.id)
    }

    logger.info('Movie tags  seed is complete')
  } catch (err) {
    logger.error(err)
  }
}
