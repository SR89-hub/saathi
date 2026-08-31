import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Root & Health check routes
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "SAATHI API Server is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "SAATHI Safety Co-Pilot API",
    time: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/saathi";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.listen(PORT, () => {
  console.log(`🛡️  SAATHI Backend running on http://localhost:${PORT}`);
});
