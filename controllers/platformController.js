import * as platformQueries from "../db/platformQueries.js";

export async function getAllPlatforms(req, res) {
  res.render("index", {
    title: "Inventory Application",
  });
}

export async function getPlatformById(req, res) {
  const { id } = req.params;
  const rows = await platformQueries.getPlatformById(id);

  try {
    const platform = rows[0];

    res.render("platform", {
      title: platform.name,
      platform: platform,
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
