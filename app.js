import express from "express"
const app = express();
import { mountRoutes } from './routes/index.js';
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Static assets
app.use(express.static(__dirname + "/public"));

//Main router
mountRoutes(app);

// 404 handler after main router above
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: "Not Found" });
});

//Error handler 
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status);
  res.json({ error: err.message || "Server Error" });
});

export default app;
