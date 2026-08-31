import express from "express";
import SafePlace from "../models/SafePlace.js";

const router = express.Router();

const defaultPlaces = [
  {
    name: "Green Pharmacy (24/7)",
    type: "pharmacy",
    address: "4th Block, 10th Main, Jayanagar",
    phone: "+91 80 2654 3210",
    isOpen247: true,
    isVerified: true,
    badgeText: "Best Option (Closest & 24/7 Lit)",
    coordinates: { lat: 12.925, lng: 77.5938 },
  },
  {
    name: "Campus Security Desk",
    type: "security",
    address: "North Gate, College Campus Rd",
    phone: "+91 80 2699 9000",
    isOpen247: true,
    isVerified: true,
    badgeText: "Guarded 24/7",
    coordinates: { lat: 12.9262, lng: 77.5912 },
  },
  {
    name: "Jayanagar Police Station",
    type: "police",
    address: "Police Station Rd, 3rd Block",
    phone: "112",
    isOpen247: true,
    isVerified: true,
    coordinates: { lat: 12.9285, lng: 77.589 },
  },
  {
    name: "Apollo Clinic & Emergency",
    type: "hospital",
    address: "Near Jayanagar Metro Station",
    phone: "+91 80 4030 4030",
    isOpen247: true,
    isVerified: true,
    coordinates: { lat: 12.93, lng: 77.585 },
  },
];

// GET /api/places/nearby
router.get("/nearby", async (req, res) => {
  try {
    const places = await SafePlace.find();
    if (!places || places.length === 0) {
      return res.json(defaultPlaces);
    }
    res.json(places);
  } catch {
    res.json(defaultPlaces);
  }
});

// POST /api/places/seed (Helper to seed default safe places)
router.post("/seed", async (req, res) => {
  try {
    await SafePlace.deleteMany({});
    const created = await SafePlace.insertMany(defaultPlaces);
    res.json({ message: "Seeded safe places successfully", places: created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
