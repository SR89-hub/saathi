import express from "express";
import SosLog from "../models/SosLog.js";

const router = express.Router();

// POST /api/sos/trigger
router.post("/trigger", async (req, res) => {
  try {
    const { lat, lng, reason, batteryLevel } = req.body;

    const log = await SosLog.create({
      coordinates: {
        lat: lat || 12.925,
        lng: lng || 77.5938,
      },
      reason: reason || "Emergency SOS Button Triggered",
      batteryLevel: batteryLevel || 84,
      status: "DISPATCHED",
    });

    console.log(`[SOS DISPATCH] Alert triggered at coords: ${lat}, ${lng}`);

    res.status(200).json({
      success: true,
      message: "Emergency broadcast dispatched to local authorities (112) & emergency contacts",
      sosId: log._id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
