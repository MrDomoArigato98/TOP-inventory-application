import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
import { body } from "express-validator";
import {
  platformValidators,
  gameValidators,
  gameValidators_2,
} from "../validators/platformValidators.js";

router.get("/new", platformController.addNewPlatformGet);
router.post("/new", platformValidators, platformController.addNewPlatformPost);

router.get("/:platformId/edit", platformController.editPlatformGetForm);
router.post(
  "/:platformId/edit",
  platformValidators,
  platformController.editPlatformPost
);

router.get("/:platformId/games/new", platformController.addNewGameToPlatformGet);
router.post(
  "/:platformId/games/new",
  gameValidators_2,
  platformController.addNewGameToPlatformPost
);

router.get("/:platformId/games/:gameId/edit", platformController.editGameGet);
router.post(
  "/:platformId/games/:gameId/edit",
  gameValidators,
  platformController.editGamePost
);

router.get("/:platformId/delete", platformController.getDeletePlatformForm);

router.post("/:platformId/delete", platformController.deletePlatformPost);


router.get(
  "/:platformId/games/:gameId/delete",
  platformController.deleteGameFromPlatformGet
);
router.post(
  "/:platformId/games/:gameId/delete",
  platformController.deleteGameFromPlatformPost
);

router.get("/:platformId/games", platformController.getPlatformById);

export default router;
