import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const movieTags = [
  { en: "Action", ka: "ექშენი" },
  { en: "Adventure", ka: "სათავგადასავლო" },
  { en: "Animation", ka: "ანიმაცია" },
  { en: "Comedy", ka: "კომედია" },
  { en: "Crime", ka: "კრიმინალი" },
  { en: "Documentary", ka: "დოკუმენტური" },
  { en: "Drama", ka: "დრამა" },
  { en: "Fantasy", ka: "ფანტასტიკა" },
  { en: "Horror", ka: "საშინელებათა" },
  { en: "Musical", ka: "მუსიკალური" },
  { en: "Mystery", ka: "მისტიკა" },
  { en: "Romance", ka: "რომანტიკა" },
  { en: "Sci-Fi", ka: "მეცნიერული ფანტასტიკა" },
  { en: "Thriller", ka: "თრილერი" },
  { en: "War", ka: "ომი" },
  { en: "Western", ka: "ვესტერნი" },
];

const prisma = new PrismaClient();

const tagSeeder = async () => {
  await prisma.tag.deleteMany();

  try {
    for (let tag of movieTags) {
      await prisma.tag.create({ data: { tag } });
    }

    console.log("\x1b[32mMovie tags seed is complete\x1b[32m");
  } catch (err) {
    console.log(err);
  }
};

const userAndEmailSeeder = async () => {
  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        password: hashedPassword,
        image: `${process.env.APP_URL}/imgs/default.png`,
      },
    });

    const verificationToken = crypto.randomUUID();

    await prisma.email.create({
      data: {
        email: "johndoe@gmail.com",
        is_primary: true,
        userId: user.id,
        verificationToken,
        emailVerifiedAt: new Date(),
      },
    });

    console.log("\x1b[32mUser and Email seed is complete\x1b[32m");
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    await userAndEmailSeeder();
    await tagSeeder();
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
};

main();
