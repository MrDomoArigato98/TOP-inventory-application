import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
//TODO - Here we make the actions related to platform

/*
root is /platform
*/
//
router.get("/", platformController.getAllPlatforms);
router.get("/:id", platformController.getPlatformById);

export default router;
