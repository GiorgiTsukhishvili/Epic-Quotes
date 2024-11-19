import logger from '../../config/winston'
import { quoteFactory } from '../factories/quote.factory'

export const quoteSeeder = async () => {
  try {
    await quoteFactory()

    logger.info('Quote seed is complete')
  } catch (err) {
    logger.error(err)
  }
}
