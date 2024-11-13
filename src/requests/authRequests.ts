import { body } from "express-validator";

export const loginRequest = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is required"),
  body("remember")
    .optional()
    .isBoolean()
    .withMessage("Remember must be a boolean value"),
];
