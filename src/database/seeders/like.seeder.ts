import { likeFactory } from '../factories/like.factory'

export const likeSeeder = async () => {
  try {
    await likeFactory()

    console.log('\x1b[32mLike seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
