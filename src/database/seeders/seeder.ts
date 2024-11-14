import { userAndEmailSeeder } from './userEmail.seeder'
import { tagSeeder } from './tag.seeder'

const main = async () => {
  try {
    await Promise.all([userAndEmailSeeder(), tagSeeder()])
  } catch (err) {
    console.log(err)
  }
}

main()
