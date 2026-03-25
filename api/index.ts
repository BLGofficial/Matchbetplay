import "dotenv/config";
import app from "../server/_core/app";

// Vercel serverless function entry point.
// The Express app handles all /api/* routes.
export default app;
