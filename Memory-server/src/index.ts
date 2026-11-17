import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

import userRoutes from "./routers/user.route.js";
import listRoutes from "./routers/list.route.js";
import itemRouter from "./routers/item.route.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT keys are not defined in the .env file");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5004;

const allowedOrigins = [
  "http://localhost:3000",
  "https://memory-client-pcgb162zu-comming2.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/items", itemRouter);

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
