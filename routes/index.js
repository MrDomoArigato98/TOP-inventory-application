const homeRoutes = require("./game");
const platformRoutes = require("./platform");
const gameRoutes = require("./game");

function mountRoutes(app) {
  app.use("/", homeRoutes);
  app.use("/platforms", platformRoutes);
  app.use("/games", gameRoutes);
}

module.exports = mountRoutes;
