import { prisma } from "../../config/prisma";

export const tagFactory = async (tag: { ka: string; en: string }) =>
  await prisma.tag.create({ data: { tag } });
