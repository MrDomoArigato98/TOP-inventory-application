import { Router } from "express";
import * as gameController from "../controllers/gameController.js";
const router = Router();


//TODO - Here we make the actions related to platform
router.get("/:games", gameController.getGame);

export default router;
