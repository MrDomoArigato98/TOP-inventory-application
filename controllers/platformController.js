import { validationResult } from "express-validator";
import * as queries from "../db/queries.js";

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
  console.log("addNewPlatformGetForm");
  res.render("platformForm", {
    title: "Add Platform",
    formAction: "/platforms/new/",
    platform: {},
  });
}
export async function addNewPlatformPost(req, res) {
  console.log("addNewPlatformPost");
  const errors = validationResult(req);
  console.log(req.body);

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
  console.log("Editing platform:");
  const platform = rows[0];
  console.log(platform);

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
  console.log(req.body);

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

  console.log(form);

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

  const { gameTitle, publisher, genre, releaseYear } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      title: "Add Game",
      game: {
        title: gameTitle,
        publisher,
        genre,
        releaseYear,
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
  await queries.addGameToPlatform(form, platformId);

  const queryResult = await queries.addGameToPlatform(form, platformId);
  res.redirect(`/platforms/${platformId}/games`);
}
export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}

export async function editGame(req, res) {
  const { gameId, platformId } = req.params;
  const rows = await queries.getGameById(gameId);

  if (!rows.length) return res.status(404).send("Game not found");

  res.render("gameForm", {
    title: "Edit game",
    formAction: `/platforms/${platformId}/games/${gameId}/edit`,
    game: rows[0],
    platformId,
  });
}

export async function editGamePost(req, res) {
  console.log("Edit Game Post");
  const { platformId, gameId } = req.params;
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      platformId,
      game: {
        platformId: gameId,
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
