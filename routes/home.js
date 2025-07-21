import express from "express";
const router = express.Router();
import * as homeController from "../controllers/homeController.js"

//TODO - Here we make the actions related to platform
router.get("/", homeController.getHome);

export default router;
