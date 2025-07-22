// const db = require("../db/quereies");

export async function getAllPlatforms(req, res) {
  res.render("index", {
    title: "Inventory Application",
  });
}

export async function getPlatformById(req, res) {
  const { id } = req.params;
  console.log("Platform Id: ", id);
}

export async function addNewPlatformGetForm(req, res) {
  console.log("addNewPlatformGetForm");
}
export async function addNewPlatformPost(req, res) {
  console.log("addNewPlatformPost");
}

export async function editPlatformGetForm(req, res) {
  console.log("editPlatformGetForm");
}

export async function editPlatformPost(req, res) {
  console.log("editPlatformPost");
}

export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}
