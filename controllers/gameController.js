// const db = require("../db/quereies");

export async function getAllGames(req, res) {
  res.send("getGame");
}

export async function getGameById(req, res) {
  const { id } = req.params;
  console.log("Game Id: ", id);
}
