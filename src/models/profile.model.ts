import { prisma } from '../config/prisma'

export class Profile {
  static async find(id: number) {
    return await prisma.user.findFirst({
      where: { id },
      include: {
        email: {
          select: {
            id: true,
            email: true,
            emailVerifiedAt: true,
            is_primary: true,
            userId: true,
          },
        },
      },
    })
  }
}
