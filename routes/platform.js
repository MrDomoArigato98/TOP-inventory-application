import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
//TODO - Here we make the actions related to platform
router.get("/:platforn", platformController.getPlatform);

export default router;
