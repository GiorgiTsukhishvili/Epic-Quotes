import { prisma } from "../../config/prisma";

export const emailFactory = async (
  email: string,
  userId: number,
  verificationToken: string
) =>
  await prisma.email.create({
    data: {
      email,
      is_primary: true,
      userId,
      verificationToken,
      emailVerifiedAt: new Date(),
    },
  });
