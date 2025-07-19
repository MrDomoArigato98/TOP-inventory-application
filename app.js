const express = require("express");
const app = express();

const mountRoutes = require("./routes");

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

module.exports = app;
