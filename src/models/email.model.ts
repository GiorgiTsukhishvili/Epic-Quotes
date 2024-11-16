import { prisma } from '../config/prisma'

export class Email {
  static async find(verificationToken: string) {
    return await prisma.email.findFirst({ where: { verificationToken } })
  }

  static async update(email: string, emailVerifiedAt: string) {
    await prisma.email.update({ where: { email }, data: { emailVerifiedAt } })
  }

  static async delete(id: number) {
    await prisma.quote.delete({ where: { id } })
  }
}
