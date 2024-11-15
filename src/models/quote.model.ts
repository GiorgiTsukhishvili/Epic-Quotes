import { prisma } from '../config/prisma'

export class Quote {
  static async delete(id: number) {
    await prisma.quote.delete({ where: { id: +id } })
  }
}
