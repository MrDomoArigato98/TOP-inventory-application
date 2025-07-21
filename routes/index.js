import homeRoutes from './home.js';
import platformRoutes from './platform.js';
import gameRoutes from './game.js';

export function mountRoutes(app) {
  app.use("/", homeRoutes);
  app.use("/platforms", platformRoutes);
  app.use("/games", gameRoutes);
}
