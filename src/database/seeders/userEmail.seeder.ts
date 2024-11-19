import { userFactory } from '../factories/user.factory'
import { emailFactory } from '../factories/email.factory'
import logger from '../../config/winston'

export const userAndEmailSeeder = async () => {
  try {
    const user = await userFactory()

    await emailFactory(user.id)

    logger.info('User and Email seed is complete')
  } catch (err) {
    console.log(err)
  }
}
