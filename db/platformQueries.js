import { pool } from "./pool.js";

export async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

export async function getPlatformById(id) {
  const { rows } = await pool.query("SELECT * FROM platforms WHERE id=($1)", [
    id,
  ]);
  console.log(rows);

  return rows;
}
