import express from "express";
const router = express.Router();
import * as homeController from "../controllers/homeController.js"

//Here I think we just displaythe index page (Homepage) with links to other 
// routes
router.get("/", homeController.getHome);

export default router;
