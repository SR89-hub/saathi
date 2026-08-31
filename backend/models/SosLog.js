import mongoose from "mongoose";

const sosLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    batteryLevel: { type: Number },
    reason: { type: String, default: "SOS button pressed" },
    status: {
      type: String,
      enum: ["ACTIVE", "DISPATCHED", "RESOLVED", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SosLog", sosLogSchema);
