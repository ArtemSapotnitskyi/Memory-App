import express from "express";
import dotnev from "dotenv";
import "./config/db.js";

dotnev.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(express.json);

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
