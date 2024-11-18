import { prisma } from '../config/prisma'

export class Email {
  static async find(verificationToken: string) {
    return await prisma.email.findFirst({
      where: { verificationToken },
    })
  }

  static async findByEmail(email: string) {
    return await prisma.email.findFirst({
      where: { email },
      include: { user: true },
    })
  }

  static async create(
    email: string,
    userId: number,
    verificationToken: string
  ) {
    return await prisma.email.create({
      data: {
        email,
        isPrimary: true,
        userId,
        verificationToken,
      },
    })
  }

  static async update(email: string, emailVerifiedAt: string) {
    await prisma.email.update({ where: { email }, data: { emailVerifiedAt } })
  }

  static async makePrimary(id: number) {
    const primaryEmail = await prisma.email.findFirst({
      where: { isPrimary: true },
    })

    if (!primaryEmail?.emailVerifiedAt) {
      throw new Error('Email is not verified')
    }

    await prisma.email.update({
      where: { id: primaryEmail?.id },
      data: { isPrimary: false },
    })

    await prisma.email.update({
      where: { id },
      data: { isPrimary: true },
    })
  }

  static async delete(id: number) {
    await prisma.quote.delete({ where: { id } })
  }
}
