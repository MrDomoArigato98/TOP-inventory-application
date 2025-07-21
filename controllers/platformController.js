// const db = require("../db/quereies");

export async function getAllPlatforms(req, res) {
  console.log("getPlatform");
  res.send("getPlatform");
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

export async function updatePlatformGetForm(req, res) {
  console.log("updatePlatformGetForm");
}
export async function updatePlatformPost(req, res) {
  console.log("updatePlatformPost");
}

export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}
