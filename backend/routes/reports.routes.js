import express from "express";
import IncidentReport from "../models/IncidentReport.js";

const router = express.Router();

const defaultReports = [
  {
    category: "Lighting",
    description: "Streetlights not working on 14th Cross road after 8 PM. Area gets very dark.",
    locationName: "3rd Block, Jayanagar",
    severity: "medium",
    upvotes: 24,
  },
  {
    category: "Isolation",
    description: "Construction detour makes the back alley completely isolated after 9 PM.",
    locationName: "Near Metro Pillar 142",
    severity: "high",
    upvotes: 18,
  },
  {
    category: "Blocked paths",
    description: "Sidewalk blocked by construction debris, forced to walk on main road.",
    locationName: "10th Main Rd",
    severity: "low",
    upvotes: 9,
  },
];

// GET /api/reports
router.get("/", async (req, res) => {
  try {
    const reports = await IncidentReport.find().sort({ createdAt: -1 });
    if (!reports || reports.length === 0) {
      return res.json(defaultReports);
    }
    res.json(reports);
  } catch {
    res.json(defaultReports);
  }
});

// POST /api/reports
router.post("/", async (req, res) => {
  try {
    const { category, description, locationName, severity } = req.body;
    if (!description || !locationName) {
      return res.status(400).json({ message: "Description and location are required" });
    }

    const report = await IncidentReport.create({
      category: category || "Lighting",
      description,
      locationName,
      severity: severity || "medium",
      upvotes: 1,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
