import { prisma } from '../config/prisma'

export class Email {
  static async delete(id: number) {
    await prisma.quote.delete({ where: { id } })
  }
}
