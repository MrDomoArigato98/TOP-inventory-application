import { Router } from "express";
import * as gameController from "../controllers/gameController.js";
const router = Router();

/*
ROOT is /games
*/
router.get("/", gameController.getAllGames); //List all games
router.get("/:gameid", gameController.getGameById); //Get specific Id

router.get("/new", gameController.addNewGameGetForm);
router.post("/new", gameController.addNewGamePost);

//How do we edit the game the user is clicked on?
router.get("/:id/edit", gameController.editGameGetForm);
router.get("/:id/edit", gameController.editGamePost);

router.get("/:id/update", gameController.updateGameGetForm);
router.post("/:id/update", gameController.updateGamePost);

router.post("/:id/delete", gameController.deleteGamePost);

export default router;
