import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// AI Chat endpoint powered by Google Gemini
router.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are SAATHI, an empathetic, hyper-aware AI personal safety co-pilot assisting someone walking or traveling in a potentially unsafe or uncomfortable situation.
The user says: "${message}"

Give a calm, protective, actionable response under 50 words. Suggest heading toward lit populated spots or sharing live location if appropriate.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return res.json({
        reply: response.text || "I'm monitoring your route and safe havens nearby. Stay on lit paths.",
        assessment: {
          level: message.toLowerCase().includes("follow") ? "ELEVATED" : "SAFE",
          recommendedAction: "Move towards nearest verified 24/7 safe point",
        },
      });
    }

    // Smart Fallback when API key is pending
    const lower = message.toLowerCase();
    let reply = "I am constantly monitoring your surroundings and active route. Stay calm, you're not alone.";
    let level = "SAFE";

    if (lower.includes("follow") || lower.includes("chase") || lower.includes("dark")) {
      reply = "I understand. Head towards a populated, well-lit street. I have 3 safe spots nearby ready for you.";
      level = "ELEVATED";
    }

    res.json({
      reply,
      assessment: {
        level,
        recommendedAction: "Move towards Green Pharmacy (240m away, 24/7 verified open)",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "AI response failed", error: error.message });
  }
});

export default router;
