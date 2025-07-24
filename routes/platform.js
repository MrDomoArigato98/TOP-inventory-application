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

router.get("/:platformId/games/new", platformController.addNewGameToPlatform);
router.post(
  "/:platformId/games/new",
  [
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
      .withMessage("Publisher must be 1-100 characters"),

    body("releaseYear")
      .trim()
      .escape()
      .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
      .withMessage("Enter a valid four digit year."),
  ],
  platformController.addNewGameToPlatformPost
);

router.get("/:platformId/games/:gameId/edit", platformController.editGame);

router.post(
  "/:platformId/games/:gameId/edit",
  [
    body("title")
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
      .withMessage("Publisher must be 1-100 characters"),

    body("releaseYear")
      .trim()
      .escape()
      .isInt({ min: 1970, max: new Date().getFullYear() + 1 })
      .withMessage("Enter a valid four digit year."),
  ],
  platformController.editGamePost
);

router.get("/:id/games", platformController.getPlatformById);

router.post("/:id/delete", platformController.deletePlatformPost);
export default router;
