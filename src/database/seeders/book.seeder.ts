import logger from '../../config/winston'
import { bookFactory } from '../factories/book.factory'

export const bookSeeder = async () => {
  try {
    await bookFactory()

    logger.info('Book seed is complete')
  } catch (err) {
    logger.error(err)
  }
}
