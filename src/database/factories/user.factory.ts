import { prisma } from "../../config/prisma";

export const userFactory = async (name: string, password: string) =>
  await prisma.user.create({
    data: {
      name,
      password,
      image: `${process.env.APP_URL}/imgs/default.png`,
    },
  });
