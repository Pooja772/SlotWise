import { body } from "express-validator";

export const createBookingValidation = [
  body("slotId")
    .notEmpty()
    .withMessage("Slot ID is required")
    .isMongoId()
    .withMessage("Slot ID must be a valid Mongo ID"),

  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
];
