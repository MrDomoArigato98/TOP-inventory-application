import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
import { body } from "express-validator";
import {
  platformValidators,
  gameValidators,
  gameValidators_2,
} from "../validators/platformValidators.js";
/*
root is /platforms
*/

router.get("/new", platformController.addNewPlatformGetForm);
router.post("/new", platformValidators, platformController.addNewPlatformPost);

router.get("/:id/edit", platformController.editPlatformGetForm);
router.post(
  "/:id/edit",
  platformValidators,
  platformController.editPlatformPost
);

router.get("/:platformId/games/new", platformController.addNewGameToPlatform);
router.post(
  "/:platformId/games/new",
  gameValidators_2,
  platformController.addNewGameToPlatformPost
);

router.get("/:platformId/games/:gameId/edit", platformController.editGame);

router.post(
  "/:platformId/games/:gameId/edit",
  gameValidators,
  platformController.editGamePost
);

router.get("/:id/games", platformController.getPlatformById);

router.post("/:id/delete", platformController.deletePlatformPost);
export default router;
