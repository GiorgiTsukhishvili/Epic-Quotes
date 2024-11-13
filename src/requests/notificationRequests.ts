import { body } from "express-validator";

export const notificationUpdateRequest = [body("ids").isArray()];
