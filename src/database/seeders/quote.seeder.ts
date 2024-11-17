import { quoteFactory } from '../factories/quote.factory'

export const quoteSeeder = async () => {
  try {
    await quoteFactory()

    console.log('\x1b[32mQuote seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
