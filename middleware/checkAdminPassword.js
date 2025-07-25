import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export function checkAdminPassword(req, res, next) {
  const { adminPassword } = req.body;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    const error = {
      msg: "Invalid admin password",
    };

    // You must attach this to the request so your controller can access it
    req.adminError = error;
    return next(); // Let the controller decide what to render
  }

  next();
}