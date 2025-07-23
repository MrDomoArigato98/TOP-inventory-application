import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
import { body } from "express-validator";

/*
root is /platforms
*/

router.get("/new", platformController.addNewPlatformGetForm);
router.post(
  "/new",
  [
    body("platform")
      .trim()
      .escape()
      .isLength({ min: 1, max: 100 })
      .withMessage("Platform name must be 1-100 characters"),

    body("manufacturer")
      .trim()
      .escape()
      .isLength({ min: 1, max: 100 })
      .withMessage("Platform name must be 1-100 characters"),

    body("releaseYear")
      .trim()
      .toInt()
      .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
      .withMessage("Enter a valid release year"),
  ],
  platformController.addNewPlatformPost
);

router.get("/:id/edit", platformController.editPlatformGetForm);
router.post(
  "/:id/edit",
  [
    body("platform")
      .trim()
      .escape()
      .isLength({ min: 1, max: 100 })
      .withMessage("Platform name must be 1-100 characters"),

    body("manufacturer")
      .trim()
      .escape()
      .isLength({ min: 1, max: 100 })
      .withMessage("Manufacturer name must be 1-100 characters"),

    body("releaseYear")
      .trim()
      .toInt()
      .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
      .withMessage("Enter a valid release year"),
  ],
  platformController.editPlatformPost
);
router.post("/:id/delete", platformController.deletePlatformPost);

router.get("/:id", platformController.getPlatformById);

export default router;
