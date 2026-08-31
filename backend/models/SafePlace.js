import mongoose from "mongoose";

const safePlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["pharmacy", "police", "hospital", "security", "store"],
      required: true,
    },
    address: { type: String, required: true },
    phone: { type: String },
    isOpen247: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
    badgeText: { type: String },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SafePlace", safePlaceSchema);
