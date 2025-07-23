import { Router } from "express";
const router = Router();
import * as platformController from "../controllers/platformController.js";
//TODO - Here we make the actions related to platform

/*
root is /platforms
*/

router.get("/new", platformController.addNewPlatformGetForm);
router.post("/new", platformController.addNewPlatformPost);

router.get("/:id/edit", platformController.editPlatformGetForm);
router.post("/:id/edit", platformController.editPlatformPost);
router.post("/:id/delete", platformController.deletePlatformPost);

router.get("/:id", platformController.getPlatformById);

export default router;
