import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
  ('Xbox Series S', 'Microsoft', 2020),
  ('Nintendo Switch', 'Nintendo', 2017),
  ('Steam', 'Valve', 2003),
  ('SNES', 'Nintendo', 1990),
  ('PS2', 'Sony Entertainment', 2000),
  ('PC', 'Various', 1981);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100),
    publisher VARCHAR(100),
    genre VARCHAR(100),
    platform_id INTEGER NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
    release_year SMALLINT
);

INSERT INTO games (title, publisher, genre, platform_id, release_year) VALUES
  -- PS4
  ('God of War', 'Sony', 'Action', (SELECT id FROM platforms WHERE name = 'PS4'), 2018),
  ('Uncharted 4', 'Sony', 'Adventure', (SELECT id FROM platforms WHERE name = 'PS4'), 2016),

  -- PS5
  ('Spider-Man: Miles Morales', 'Sony', 'Action', (SELECT id FROM platforms WHERE name = 'PS5'), 2020),
  ('Ratchet & Clank: Rift Apart', 'Sony', 'Platformer', (SELECT id FROM platforms WHERE name = 'PS5'), 2021),

  -- Xbox One
  ('Halo 5: Guardians', 'Microsoft', 'FPS', (SELECT id FROM platforms WHERE name = 'Xbox One'), 2015),
  ('Gears 5', 'Microsoft', 'Shooter', (SELECT id FROM platforms WHERE name = 'Xbox One'), 2019),

  -- Xbox Series
  ('Halo Infinite', 'Microsoft', 'FPS', (SELECT id FROM platforms WHERE name = 'Xbox Series X'), 2021),
  ('Forza Horizon 5', 'Microsoft', 'Racing', (SELECT id FROM platforms WHERE name = 'Xbox Series S'), 2021),

  -- Nintendo Switch
  ('The Legend of Zelda: Breath of the Wild', 'Nintendo', 'Adventure', (SELECT id FROM platforms WHERE name = 'Nintendo Switch'), 2017),
  ('Animal Crossing: New Horizons', 'Nintendo', 'Simulation', (SELECT id FROM platforms WHERE name = 'Nintendo Switch'), 2020),

  -- Steam
  ('Hades', 'Supergiant Games', 'Roguelike', (SELECT id FROM platforms WHERE name = 'Steam'), 2020),
  ('Stardew Valley', 'ConcernedApe', 'Simulation', (SELECT id FROM platforms WHERE name = 'Steam'), 2016),

  -- Retro
  ('Chrono Trigger', 'Square', 'RPG', (SELECT id FROM platforms WHERE name = 'SNES'), 1995),
  ('Final Fantasy X', 'Square Enix', 'RPG', (SELECT id FROM platforms WHERE name = 'PS2'), 2001),

  -- PC (Generic)
  ('Minecraft', 'Mojang', 'Sandbox', (SELECT id FROM platforms WHERE name = 'PC'), 2011),
  ('Baldur’s Gate 3', 'Larian Studios', 'RPG', (SELECT id FROM platforms WHERE name = 'PC'), 2023),

    -- PS4
  ('Bloodborne', 'FromSoftware', 'Action RPG', (SELECT id FROM platforms WHERE name = 'PS4'), 2015),
  ('The Last of Us Part II', 'Naughty Dog', 'Action', (SELECT id FROM platforms WHERE name = 'PS4'), 2020),

  -- PS5
  ('Returnal', 'Housemarque', 'Roguelike Shooter', (SELECT id FROM platforms WHERE name = 'PS5'), 2021),
  ('Demon’s Souls Remake', 'Bluepoint Games', 'Action RPG', (SELECT id FROM platforms WHERE name = 'PS5'), 2020),

  -- Xbox One
  ('Sunset Overdrive', 'Insomniac Games', 'Action', (SELECT id FROM platforms WHERE name = 'Xbox One'), 2014),
  ('Quantum Break', 'Remedy Entertainment', 'Sci-Fi Shooter', (SELECT id FROM platforms WHERE name = 'Xbox One'), 2016),

  -- Xbox Series X/S
  ('Redfall', 'Arkane Studios', 'FPS', (SELECT id FROM platforms WHERE name = 'Xbox Series X'), 2023),
  ('Senua’s Saga: Hellblade II', 'Ninja Theory', 'Psychological Action', (SELECT id FROM platforms WHERE name = 'Xbox Series S'), 2024),

  -- Nintendo Switch
  ('Super Smash Bros. Ultimate', 'Nintendo', 'Fighting', (SELECT id FROM platforms WHERE name = 'Nintendo Switch'), 2018),
  ('Metroid Dread', 'Nintendo', 'Action', (SELECT id FROM platforms WHERE name = 'Nintendo Switch'), 2021),

  -- Steam
  ('Disco Elysium', 'ZA/UM', 'RPG', (SELECT id FROM platforms WHERE name = 'Steam'), 2019),
  ('Slay the Spire', 'MegaCrit', 'Card Battler', (SELECT id FROM platforms WHERE name = 'Steam'), 2017),

  -- SNES
  ('Super Mario World', 'Nintendo', 'Platformer', (SELECT id FROM platforms WHERE name = 'SNES'), 1990),
  ('Donkey Kong Country', 'Rare', 'Platformer', (SELECT id FROM platforms WHERE name = 'SNES'), 1994),

  -- PS2
  ('Shadow of the Colossus', 'Team Ico', 'Adventure', (SELECT id FROM platforms WHERE name = 'PS2'), 2005),
  ('Metal Gear Solid 3: Snake Eater', 'Konami', 'Stealth', (SELECT id FROM platforms WHERE name = 'PS2'), 2004),

  -- PC
  ('The Witcher 3: Wild Hunt', 'CD Projekt', 'RPG', (SELECT id FROM platforms WHERE name = 'PC'), 2015),
  ('Dota 2', 'Valve', 'MOBA', (SELECT id FROM platforms WHERE name = 'PC'), 2013);


  
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
    console.log("done");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await client.end();
  }
}

main();
