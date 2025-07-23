import { validationResult } from "express-validator";
import * as queries from "../db/queries.js";

export async function getAllPlatforms(req, res) {
  res.render("index", {
    title: "Game Inventory",
  });
}

export async function getPlatformById(req, res) {
  const { id } = req.params;
  const gameRows = await queries.getGamesByPlatformId(id);
  const platformRows = await queries.getPlatformNameById(id);
  const manufacturer = platformRows[0];
  console.log("Viewing platform games:");
  console.log(gameRows);

  try {
    res.render("platform", {
      title: "Game Inventory",
      platform: manufacturer,
      games: gameRows,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function addNewPlatformGetForm(req, res) {
  console.log("addNewPlatformGetForm");
}
export async function addNewPlatformPost(req, res) {
  console.log("addNewPlatformPost");
}

export async function editPlatformGetForm(req, res) {
  const { id } = req.params;
  const rows = await queries.getPlatform(id);
  console.log("Editing platform:");

  console.log(rows);

  const platform = rows[0];

  res.render("platformForm", {
    title: "Edit Platform",
    platform: platform,
  });
}

export async function editPlatformPost(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;
    
  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", {
      platform: {
        id,
        name: req.body.platform,
        manufacturer: req.body.manufacturer,
        release_year: req.body.releaseYear,
      },
      errors: errors.array(),
    });
  }

  const form = req.body;

  await queries.editPlatform(id, form);

  res.redirect("/");
}

export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}
