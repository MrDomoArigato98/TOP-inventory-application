import { Router } from "express";
import { body } from "express-validator";
import * as gameController from "../controllers/gameController.js";
const router = Router();

/*
ROOT is /game
*/
router.get("/", gameController.getAllGames); //List all games
router.get("/:id", gameController.getGameById); //Get specific Id

router.get("/new", gameController.addNewGameGetForm);
router.post("/new", gameController.addNewGamePost);

//How do we edit the game the user is clicked on?
router.get("/:id/edit", gameController.editGameGetForm);
router.post(
  "/:id/edit",
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
  gameController.editGamePost
);

router.post("/:id/delete", gameController.deleteGamePost);

export default router;
