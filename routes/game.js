import { Router } from "express";
import { body } from "express-validator";
import * as gameController from "../controllers/gameController.js";
const router = Router();

/*
ROOT is /games
*/
router.get("/", gameController.getAllGames); //List all games


// router.get("/:id", gameController.getGameById); //Get specific Id
// //How do we edit the game the user is clicked on?
// router.get("/:id/edit", gameController.editGameGetForm);
// router.post(
//   "/:id/edit",
//   gameController.editGamePost
// );

// router.post("/:gameId/delete", gameController.deleteGamePost);

export default router;
