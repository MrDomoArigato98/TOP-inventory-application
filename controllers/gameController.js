//And we need to make our queries too.
// const db = require("../db/quereies");

//We have to figure out how to use express-validator for this
import { body, validationResult } from "express-validator";

export async function getAllGames(req, res) {
  res.send("getGame");
}

export async function getGameById(req, res) {
  const { id } = req.params;
  console.log("Game Id: ", id);
}

export async function addNewGameGetForm(req, res) {
  console.log("addNewGameGetForm");

  // res.render("form")
}

export async function addNewGamePost(req, res) {
  // Here we have to sanitize the input as well

  res.redirect("/");
}

export async function editGameGetForm(req, res) {
  console.log("editGameGetForm");
}

export async function editGamePost(req, res) {
  console.log("editGamePost");
}


export async function deleteGamePost(req,res) {
    console.log("deleteGamePost");
    
}