import { validationResult } from "express-validator";
import * as queries from "../db/queries.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAllPlatforms(req, res) {
  res.render("index", {
    title: "Game Inventory",
  });
}

export async function getPlatformById(req, res) {
  const { platformId } = req.params;
  const gameRows = await queries.getGamesByPlatformId(platformId);
  const platformRows = await queries.getPlatformNameById(platformId);
  const manufacturer = platformRows[0];

  try {
    res.render("platform", {
      title: "Game Inventory",
      platform: manufacturer,
      platformId: platformId,
      games: gameRows,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function addNewPlatformGetForm(req, res) {
  res.render("platformForm", {
    title: "Add Platform",
    formAction: "/platforms/new/",
    platform: {},
  });
}
export async function addNewPlatformPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", {
      platform: {
        platformName: req.body.platformName,
        manufacturer: req.body.manufacturer,
        release_year: req.body.releaseYear,
      },
      title: "Edit Platform",
      errors: errors.array(),
      formAction: "/platforms/new/",
    });
  }
  const form = req.body;

  const queryResult = await queries.addPlatform(form);
  res.redirect("/");
}

export async function editPlatformGetForm(req, res) {
  const { platformId } = req.params;
  const rows = await queries.getPlatform(platformId);

  const platform = rows[0];

  res.render("platformForm", {
    title: "Edit Platform",
    platform: {
      id: platform.id,
      platformName: platform.name,
      manufacturer: platform.manufacturer,
      release_year: platform.release_year,
    },
    formAction: `/platforms/${platform.id}/edit`,
  });
}

export async function editPlatformPost(req, res) {
  const errors = validationResult(req);
  const { platformId } = req.params;
  const { adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).render("platformForm", {
      platform: {
        platformId,
        platformName: req.body.platformName,
        manufacturer: req.body.manufacturer,
        release_year: req.body.releaseYear,
      },
      title: "Edit Platform",
      formAction: `/platforms/${platformId}/edit`,
      errors: [{ msg: "Invalid admin password" }],
    });
  }
  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", {
      platform: {
        platformId,
        platformName: req.body.platformName,
        manufacturer: req.body.manufacturer,
        release_year: req.body.releaseYear,
      },
      title: "Edit Platform",
      formAction: `/platforms/${platformId}/edit`,
      errors: errors.array(),
    });
  }

  const form = req.body;

  await queries.editPlatform(platformId, form);

  res.redirect("/");
}
export async function addNewGameToPlatform(req, res) {
  const { platformId } = req.params;

  res.render("gameForm", {
    title: "Add game",
    formAction: `/platforms/${platformId}/games/new`,
    game: {}, // so all fields are blank
    platformId,
  });
}

export async function addNewGameToPlatformPost(req, res) {
  const errors = validationResult(req);
  const { platformId } = req.params;

  const { gameTitle, publisher, genre, releaseYear, adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).render("platformForm", {
      title: "Add Game",
      game: {
        title: gameTitle,
        publisher,
        genre,
        release_year: releaseYear,
      },
      platformId,
      errors: errors.array(),
      formAction: `/platforms/${platformId}/games/new`,
      errors: [{ msg: "Invalid admin password" }],
    });
  }
  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      title: "Add Game",
      game: {
        title: gameTitle,
        publisher,
        genre,
        release_year: releaseYear,
      },
      platformId,
      errors: errors.array(),
      formAction: `/platforms/${platformId}/games/new`,
    });
  }

  const form = {
    title: gameTitle,
    publisher,
    genre,
    releaseYear,
  };

  const queryResult = await queries.addGameToPlatform(form, platformId);
  res.redirect(`/platforms/${platformId}/games`);
}
export async function deletePlatformPost(req, res) {
  const { platformId } = req.params;
  try {
    const result = await queries.deletePlatform(platformId);
  } catch (error) {
    console.error(error);
  }

  res.redirect("/");
}

export async function editGame(req, res) {
  const { gameId, platformId } = req.params;
  const rows = await queries.getGameById(gameId);

  res.render("gameForm", {
    title: "Edit game",
    formAction: `/platforms/${platformId}/games/${gameId}/edit`,
    game: rows[0],
    platformId,
  });
}

export async function editGamePost(req, res) {
  const { platformId, gameId } = req.params;

  const { adminPassword } = req.body;
  const errors = validationResult(req);

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).render("gameForm", {
      game: {
        platformId,
        gameId,
        title: req.body.gameTitle,
        publisher: req.body.publisher,
        genre: req.body.genre,
        release_year: req.body.releaseYear,
      },
      errors: [{ msg: "Invalid admin password" }],
      formAction: `/platforms/${platformId}/games/${gameId}/edit`,
      title: "Edit game",
    });
  }
  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      platformId,
      game: {
        title: req.body.gameTitle,
        publisher: req.body.publisher,
        genre: req.body.genre,
        release_year: req.body.releaseYear,
      },
      title: "Edit game",
      errors: errors.array(),
      formAction: `/platforms/${platformId}/games/${gameId}/edit`,
    });
  }

  const form = {
    title: req.body.gameTitle,
    publisher: req.body.publisher,
    genre: req.body.genre,
    release_year: req.body.releaseYear,
  };
  await queries.editGame(gameId, form);

  // TODO
  // Redirect to just displaying the game on it's own.
  res.redirect(`/platforms/${platformId}/games`);
}

export async function deleteGameFromPlatformPost(req, res) {
  const { gameId, platformId } = req.params;

  const result = await queries.deleteGame(gameId);

  res.redirect(`/platforms/${platformId}/games`);
}
