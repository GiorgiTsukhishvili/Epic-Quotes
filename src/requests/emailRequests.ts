import { body } from "express-validator";

export const emailVerificationRequest = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
];
