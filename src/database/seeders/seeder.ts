import { userAndEmailSeeder } from './userEmail.seeder'
import { tagSeeder } from './tag.seeder'
import { movieSeeder } from './movie.seeder'
import { movieTagSeeder } from './movieTag.seeder'

const main = async () => {
  try {
    await userAndEmailSeeder()
    await tagSeeder()
    await movieSeeder()
    await movieTagSeeder()
  } catch (err) {
    console.log(err)
  }
}

main()
