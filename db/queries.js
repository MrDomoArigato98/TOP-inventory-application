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
  console.log(rows);

  return rows;
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
    [form.gameTitle, form.gamePublisher, form.gameGenre, form.releaseYear, id]
  );

  return res.rows[0];
}
