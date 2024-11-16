import { prisma } from '../../config/prisma'

export const movieTagFactory = async (movieId: number, tagId: number) =>
  await prisma.movieTag.create({ data: { movieId, tagId } })
