import homeRoutes from "./home.js";
import platformRoutes from "./platform.js";
import gameRoutes from "./game.js";

export function mountRoutes(app) {
  app.use("/", homeRoutes); // The below two are quite unnecessary? I think
  app.use("/platforms", platformRoutes); // This could bring me to a list of platforms
  app.use("/games", gameRoutes); // This could bring me to a list of all games
}
