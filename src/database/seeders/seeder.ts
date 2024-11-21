import { userAndEmailSeeder } from './userEmail.seeder'
import { tagSeeder } from './tag.seeder'
import { bookSeeder } from './book.seeder'
import { bookTagSeeder } from './bookTag.seeder'
import { quoteSeeder } from './quote.seeder'
import { likeSeeder } from './like.seeder'
import { commentSeeder } from './comment.seeder'
import logger from '../../config/winston'

const main = async () => {
  try {
    await userAndEmailSeeder()
    await tagSeeder()
    await bookSeeder()
    await bookTagSeeder()
    await quoteSeeder()
    await likeSeeder()
    await commentSeeder()
  } catch (err) {
    logger.error(err)
  }
}

main()
