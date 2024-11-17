import { userAndEmailSeeder } from './userEmail.seeder'
import { tagSeeder } from './tag.seeder'
import { movieSeeder } from './movie.seeder'
import { movieTagSeeder } from './movieTag.seeder'
import { quoteSeeder } from './quote.seeder'
import { likeSeeder } from './like.seeder'
import { commentSeeder } from './comment.seeder'

const main = async () => {
  try {
    await userAndEmailSeeder()
    await tagSeeder()
    await movieSeeder()
    await movieTagSeeder()
    await quoteSeeder()
    await likeSeeder()
    await commentSeeder()
  } catch (err) {
    console.log(err)
  }
}

main()
