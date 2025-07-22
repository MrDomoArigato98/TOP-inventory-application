import * as platformQueries from "../db/platformQueries.js";

export async function getAllPlatforms(req, res) {
  res.render("index", {
    title: "Inventory Application",
  });
}

export async function getPlatformById(req, res) {
  const { id } = req.params;
  const gameRows = await platformQueries.getGamesByPlatformId(id);
  const platformRows= await platformQueries.getPlatformNameById(id)

  const manufacturer = platformRows[0]
  
  try {

    res.render("platform", {
      title: manufacturer,
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
  console.log("editPlatformGetForm");
}

export async function editPlatformPost(req, res) {
  console.log("editPlatformPost");
}

export async function deletePlatformPost(req, res) {
  console.log("deletePlatformPost");
}
