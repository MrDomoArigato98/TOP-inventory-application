import { body } from "express-validator";
import { checkAdminPassword } from "../middleware/checkAdminPassword.js";

export const platformValidators = [
  body("platformName")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Platform name must be 1-100 characters"),

  body("manufacturer")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Manufacturer name must be 1-100 characters"),

  body("release_year")
    .trim()
    .toInt()
    .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
    .withMessage("Enter a valid release year"),
  checkAdminPassword,
];

export const gameValidators = [
  body("gameTitle")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be 1-100 characters"),

  body("publisher")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Publisher must be 1-100 characters"),

  body("genre")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Genre must be 1-100 characters"),

  body("releaseYear")
    .trim()
    .toInt()
    .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
    .withMessage("Enter a valid release year"),
  checkAdminPassword,
];
export const gameValidators_2 = [
  body("gameTitle")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be 1-100 characters"),

  body("publisher")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Publisher must be 1-100 characters"),

  body("genre")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("Genre must be 1-100 characters"),

  body("releaseYear")
    .trim()
    .toInt()
    .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
    .withMessage("Enter a valid release year"),
  checkAdminPassword,
];
