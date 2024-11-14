import bcrypt from 'bcrypt'
import { userFactory } from '../factories/user.factory'
import { emailFactory } from '../factories/email.factory'
import { faker } from '@faker-js/faker/.'

export const userAndEmailSeeder = async () => {
  try {
    const hashedPassword = await bcrypt.hash('12345678', 10)

    const user = await userFactory(faker.person.fullName(), hashedPassword)

    const verificationToken = crypto.randomUUID()

    emailFactory(faker.internet.email(), user.id, verificationToken)

    console.log('\x1b[32mUser and Email seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
