import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import placesRoutes from "./routes/places.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import sosRoutes from "./routes/sos.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "SAATHI Safety Co-Pilot API",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/sos", sosRoutes);

// MongoDB connection with graceful offline fallback
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/saathi";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.warn("⚠️ MongoDB connection notice:", err.message);
    console.log("ℹ️ Server running with in-memory fallback mocks enabled.");
  });

app.listen(PORT, () => {
  console.log(`🛡️  SAATHI Backend running on http://localhost:${PORT}`);
});
