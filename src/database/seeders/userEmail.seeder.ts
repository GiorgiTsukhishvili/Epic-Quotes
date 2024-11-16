import { userFactory } from '../factories/user.factory'
import { emailFactory } from '../factories/email.factory'

export const userAndEmailSeeder = async () => {
  try {
    const user = await userFactory()

    await emailFactory(user.id)

    console.log('\x1b[32mUser and Email seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
