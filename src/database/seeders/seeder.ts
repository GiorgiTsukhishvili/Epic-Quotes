import { userAndEmailSeeder } from './userEmail.seeder'
import { tagSeeder } from './tag.seeder'
import { movieSeeder } from './movie.seeder'

const main = async () => {
  try {
    await Promise.all([userAndEmailSeeder(), tagSeeder(), movieSeeder()])
  } catch (err) {
    console.log(err)
  }
}

main()
