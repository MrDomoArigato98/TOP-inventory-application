import { pool } from "./pool.js";

export async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

export async function getPlatform(id) {
  const { rows } = await pool.query("SELECT * FROM platforms where id = ($1)", [
    id,
  ]);
  return rows;
}
export async function getGamesByPlatformId(id) {
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE platform_id=($1)",
    [id]
  );

  return rows;
}
export async function addGameToPlatform(form, platformId) {
  const { rows } = await pool.query(
    `
    INSERT INTO games (title, publisher, genre, platform_id, release_year)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [form.title, form.publisher, form.genre, platformId, form.releaseYear]
  );

  return rows[0];
}

export async function addPlatform(form) {
  const { rows } = await pool.query(
    `
    INSERT INTO platforms (name,manufacturer,release_year)
    VALUES ($1,$2,$3)
    RETURNING *;
    `,
    [form.platformName, form.manufacturer, form.release_year]
  );

  return rows;
}
export async function editPlatform(id, form) {
  const res = await pool.query(
    `
    UPDATE platforms
    SET name = $1,
      manufacturer = $2,
      release_year = $3
    WHERE id = $4
    RETURNING *;
    `,
    [form.platformName, form.manufacturer, form.release_year, id]
  );

  return res;
}
export async function getPlatformNameById(id) {
  const { rows } = await pool.query(
    "SELECT name FROM platforms WHERE id =($1)",
    [id]
  );

  return rows;
}

export async function getGameById(id) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = ($1)", [
    id,
  ]);

  return rows;
}

export async function editGame(id, form) {
  const res = await pool.query(
    `
    UPDATE games
    SET title = $1,
        publisher = $2,
        genre = $3,
        release_year = $4
      WHERE id = $5
      RETURNING *;
    `,
    [form.title, form.publisher, form.genre, form.release_year, id]
  );

  return res.rows[0];
}

export async function deletePlatform(platformId) {
  const res = await pool.query(
    `
    DELETE FROM platforms 
      WHERE id = ($1)
    `,
    [platformId]
  );

  return res;
}

export async function deleteGame(gameId) {
  const res = await pool.query(
    `
    DELETE FROM games
      WHERE id = ($1)`,
    [gameId]
  );

  return res;
}
