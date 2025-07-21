// const db = require("../db/quereies");

export async function getAllPlatforms(req, res) {
  console.log("getPlatform");
  res.send("getPlatform");
}

export async function getPlatformById(req, res) {
  const { id } = req.params;
  console.log("Platform Id: ", id);
}
