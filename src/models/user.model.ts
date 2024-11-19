import { prisma } from '../config/prisma'

export class User {
  static async create(name: string, password: string, image: string) {
    return await prisma.user.create({
      data: {
        name,
        password,
        image,
      },
    })
  }
}
