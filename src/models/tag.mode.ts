import { prisma } from '../config/prisma'

export class Tag {
  static async findMany() {
    return await prisma.tag.findMany()
  }
}
