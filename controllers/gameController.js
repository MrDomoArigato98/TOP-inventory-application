import * as queries from "../db/queries.js";
//We have to figure out how to use express-validator for this
import { validationResult } from "express-validator";

export async function getAllGames(req, res) {
  res.send("getGame");
}

export async function getGameById(req, res) {
  const { id } = req.params;
}

export async function addNewGameGetForm(req, res) {
  console.log("test");
  res.render("gameForm", {
    title: "Add game",
  });
}

export async function addNewGamePost(req, res) {}

export async function editGameGetForm(req, res) {
  const { id } = req.params;

  const rows = await queries.getGameById(id);
  const game = rows[0];

  res.render("gameForm", {
    title: "Edit game",
    game: game,
  });
}

export async function editGamePost(req, res) {
  console.log("editGamePost");
  const { platformId } = req.params;
  const errors = validationResult(req);

  console.log(req.body);

  const { title, publisher, genre, release_year } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("gameForm", {
      game: {
        id,
        gameTitle,
        release_year,
        genre,
        publisher,
      },
      title: "Edit game",
      errors: errors.array(),
    });
  }

  await queries.editGame(id, req.body);

  // TODO
  // Redirect to just displaying the game on it's own.
  res.redirect(`/`);
}

export async function deleteGamePost(req, res) {
  console.log("deleteGamePost");
}
