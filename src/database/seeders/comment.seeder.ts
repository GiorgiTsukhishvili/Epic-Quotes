import logger from '../../config/winston'
import { commentFactory } from '../factories/comment.factory'

export const commentSeeder = async () => {
  try {
    await commentFactory()

    logger.info('Comment seed is complete')
  } catch (err) {
    console.log(err)
  }
}
