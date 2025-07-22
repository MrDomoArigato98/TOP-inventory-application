import { pool } from "./pool.js";

export async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
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

  return rows
}
