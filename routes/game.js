import { Router } from "express";
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
router.post("/:id/edit", gameController.editGamePost);

router.post("/:id/delete", gameController.deleteGamePost);

export default router;
