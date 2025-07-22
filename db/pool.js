import dotenv from "dotenv";
dotenv.config();

import * as pg from "pg";
const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

console.log(
  "Connecting to DB:",
  process.env.DATABASE_NAME || process.env.DATABASE_URL
);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
});
