import { prisma } from '../../config/prisma'
import { movieTagFactory } from '../factories/movieTag.factory'

export const movieTagSeeder = async () => {
  try {
    const movie = await prisma.movie.findFirst()

    const tags = await prisma.tag.findMany()

    for (let tag of tags) {
      await movieTagFactory(movie!.id, tag.id)
    }

    console.log('\x1b[32mMovie tags  seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
