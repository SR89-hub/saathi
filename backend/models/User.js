import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relationship: { type: String, default: "Emergency Contact" },
  isPrimary: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    avatarUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    emergencyContacts: [contactSchema],
    safetyScore: { type: Number, default: 90 },
    lastKnownLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
