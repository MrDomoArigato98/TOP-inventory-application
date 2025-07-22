// import db from "../db/queries.js"; // Uncomment if/when you use it
import express from "express";
import { body, validationResult } from "express-validator";
import * as platformDb from "../db/platformQueries.js";

// Home page controller
export async function getHome(req, res) {
  const platforms = await platformDb.getAllPlatforms();
  res.render("index", {
    title: "Inventory App",
    platforms: platforms,
  });
}
