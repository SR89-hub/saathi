import mongoose from "mongoose";

const incidentReportSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Lighting", "Transport", "Isolation", "Blocked paths", "Harassment"],
      required: true,
    },
    description: { type: String, required: true },
    locationName: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    upvotes: { type: Number, default: 1 },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("IncidentReport", incidentReportSchema);
