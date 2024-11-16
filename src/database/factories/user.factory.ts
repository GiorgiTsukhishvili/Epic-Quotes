import { faker } from '@faker-js/faker/.'
import { prisma } from '../../config/prisma'
import bcrypt from 'bcrypt'

export const userFactory = async () =>
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      password: await bcrypt.hash('12345678', 10),
      image: `${process.env.APP_URL}/imgs/default.png`,
    },
  })
