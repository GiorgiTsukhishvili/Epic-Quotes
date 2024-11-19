import logger from '../../config/winston'
import { movieFactory } from '../factories/movie.factory'

export const movieSeeder = async () => {
  try {
    await movieFactory()

    logger.info('Movie seed is complete')
  } catch (err) {
    console.log(err)
  }
}
