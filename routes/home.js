const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

//TODO - Here we make the actions related to platform

router.get("/", homeController.getHome);

module.exports = router;
