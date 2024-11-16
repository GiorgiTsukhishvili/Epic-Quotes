import { movieFactory } from '../factories/movie.factory'

export const movieSeeder = async () => {
  try {
    await movieFactory()

    console.log('\x1b[32mMovie seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
