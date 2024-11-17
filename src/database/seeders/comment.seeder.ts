import { commentFactory } from '../factories/comment.factory'

export const commentSeeder = async () => {
  try {
    await commentFactory()

    console.log('\x1b[32mComment seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
