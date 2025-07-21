const { Client } = require("pg");
require("dotenv").config({ path: __dirname + "/../.env" });
const isProduction = process.env.NODE_ENV === "production";

const SQL = `

TRUNCATE TABLE games, platforms RESTART IDENTITY CASCADE;

CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    manufacturer VARCHAR(100),
    release_year SMALLINT
);


INSERT INTO platforms (name, manufacturer, release_year) VALUES
    ('PS4', 'Sony Entertainment', 2013),
    ('PS5', 'Sony Entertainment', 2020),
    ('Xbox One', 'Microsoft', 2013),
    ('Xbox Series X', 'Microsoft', 2020),
    ('Xbox Series S', 'Microsoft', 2020);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100),
    publisher VARCHAR(100),
    genre VARCHAR(100),
    platform_id INTEGER NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
    release_year SMALLINT
);

INSERT INTO games (title, publisher, genre, platform_id, release_year) VALUES
  ('God of War', 'Sony', 'Action', (SELECT id FROM platforms WHERE name = 'PS4'), 2018),
  ('Spider-Man: Miles Morales', 'Sony', 'Action', (SELECT id FROM platforms WHERE name = 'PS5'), 2020),
  ('Halo 5: Guardians', 'Microsoft', 'FPS', (SELECT id FROM platforms WHERE name = 'Xbox One'), 2015),
  ('Halo Infinite', 'Microsoft', 'FPS', (SELECT id FROM platforms WHERE name = 'Xbox Series X'), 2021),
  ('Forza Horizon 5', 'Microsoft', 'Racing', (SELECT id FROM platforms WHERE name = 'Xbox Series S'), 2021);

`;

async function main() {
  console.log("Seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('done');
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await client.end();
  }
}

main();
