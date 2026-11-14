import express from "express";
import dotnev from "dotenv";
import "./config/db.js";

import userRoutes from "./routers/user.route.js";

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT keys are not defined in the .env file");
  process.exit(1);
}

dotnev.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Memory Backend is running on TypeScript!");
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server due to initialization errors:",
      error,
    );
    process.exit(1);
  }
};

startServer();
