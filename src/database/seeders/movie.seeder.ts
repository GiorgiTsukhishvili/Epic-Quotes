import bcrypt from "bcrypt";
import { userFactory } from "../factories/user.factory";
import { emailFactory } from "../factories/email.factory";

export const userAndEmailSeeder = async () => {
  try {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const user = await userFactory("John Doe", hashedPassword);

    const verificationToken = crypto.randomUUID();

    emailFactory("john@gmail.com", user.id, verificationToken);

    console.log("\x1b[32mUser and Email seed is complete\x1b[32m");
  } catch (err) {
    console.log(err);
  }
};
