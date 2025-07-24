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
      platformId: id,
      games: gameRows,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function addNewPlatformGetForm(req, res) {
  console.log("addNewPlatformGetForm");
  res.render("addPlatformForm", {
    title: "Add Platform",
  });
}
export async function addNewPlatformPost(req, res) {
  console.log("addNewPlatformPost");
  const errors = validationResult(req);

  const { platform, manufacturer, releaseYear } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).render("addPlatformForm", {
      name: platform,
      manufacturer,
      release_year: releaseYear,
      title: "Edit Platform",
      errors: errors.array(),
    });
  }
  const form = req.body;

  const queryResult = await queries.addPlatform(form);

  res.redirect("/");
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
      title: "Edit Platform",
      errors: errors.array(),
    });
  }

  const form = req.body;

  await queries.editPlatform(id, form);

  res.redirect("/");
}
export async function addNewGameToPlatform(req, res) {
  const { platformId } = req.params;
  const rows = await queries.getGameById(platformId);
  const game = rows[0];

  res.render("addGameForm", {
    title: "Add game",
    platformId: platformId,
    game: game,
  });
}
export async function addNewGameToPlatformPost(req, res) {
  const errors = validationResult(req);
  const { platformId } = req.params;

  const { gameTitle, publisher, genre, releaseYear } = req.body;
  console.log(gameTitle);

  if (!errors.isEmpty()) {
    return res.status(400).render("addGameForm", {
      title: "Add Game",
      releaseYear,
      gameTitle,
      genre,
      publisher,
      platformId,
      errors: errors.array(),
    });
  }

  const form = req.body;

  const queryResult = await queries.addGameToPlatform(form, platformId);
  res.redirect(`/platforms/${platformId}/games`);
}
export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}

export async function editGame(req, res) {
  const { gameId, platformId } = req.params;
  const rows = await queries.getGameById(gameId);
  const game = rows[0];
  res.render("gameForm", {
    title: "Edit game",
    gameId: game.id,
    game,
    platformId,
  });
}

export async function editGamePost(req, res) {
  const { platformId, gameId } = req.params;
  const errors = validationResult(req);

  console.log(platformId);

  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      platformId,
      game: {
        id: gameId,
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        release_year: req.body.releaseYear,
      },
      title: "Edit game",
      errors: errors.array(),
    });
  }

  await queries.editGame(gameId, req.body);

  // TODO
  // Redirect to just displaying the game on it's own.
  res.redirect(`/platforms/${platformId}/games`);
}
