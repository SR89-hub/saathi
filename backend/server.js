import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base Health Check
app.get("/api/health", (req, res) => {
  res.json({ message: "SAATHI Backend is running" });
});

// TODO: Add your routes and database connections below

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
