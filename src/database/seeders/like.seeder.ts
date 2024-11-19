import logger from '../../config/winston'
import { likeFactory } from '../factories/like.factory'

export const likeSeeder = async () => {
  try {
    await likeFactory()

    logger.info('Like seed is complete')
  } catch (err) {
    console.log(err)
  }
}
