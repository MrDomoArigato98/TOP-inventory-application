import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
//TODO - Here we make the actions related to platform

/*
root is /platforms
*/

router.get("/", platformController.getAllPlatforms);
router.get("/new", platformController.addNewPlatformGetForm);
router.post("/new", platformController.addNewPlatformPost);

router.get("/:id", platformController.getPlatformById);

router.get("/:id/edit", platformController.editPlatformGetForm);
router.post("/:id/edit", platformController.editPlatformPost);

router.get("/:id/update", platformController.updatePlatformGetForm);
router.post("/:id/update", platformController.updatePlatformPost);

router.post("/:id/delete", platformController.deletePlatformPost);

export default router;
