import axios from "axios";
import { ChatMessage, SafePlace, IncidentReport, UserProfile } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token if stored
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("saathi_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback Mock Data for instant frontend preview & offline development
export const mockUserProfile: UserProfile = {
  name: "Aditi Sharma",
  email: "aditi@example.com",
  phone: "+91 98765 43210",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  primaryContact: {
    id: "c1",
    name: "Rahul",
    phone: "+91 98765 43210",
    relationship: "Brother / Emergency Contact",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    isSharingActive: false,
  },
  safetyScore: 92,
};

export const mockSafePlaces: SafePlace[] = [
  {
    id: "p1",
    name: "Green Pharmacy (24/7)",
    type: "pharmacy",
    distanceMeters: 240,
    walkTimeMinutes: 3,
    isOpen: true,
    address: "4th Block, 10th Main, Jayanagar",
    phone: "+91 80 2654 3210",
    isVerified: true,
    badgeText: "Best Option (Closest & 24/7 Lit)",
    coordinates: { lat: 12.925, lng: 77.5938 },
  },
  {
    id: "p2",
    name: "Campus Security Desk",
    type: "security",
    distanceMeters: 430,
    walkTimeMinutes: 5,
    isOpen: true,
    address: "North Gate, College Campus Rd",
    phone: "+91 80 2699 9000",
    isVerified: true,
    badgeText: "Guarded 24/7",
    coordinates: { lat: 12.9262, lng: 77.5912 },
  },
  {
    id: "p3",
    name: "Jayanagar Police Station",
    type: "police",
    distanceMeters: 650,
    walkTimeMinutes: 8,
    isOpen: true,
    address: "Police Station Rd, 3rd Block",
    phone: "112",
    isVerified: true,
    coordinates: { lat: 12.9285, lng: 77.589 },
  },
  {
    id: "p4",
    name: "Apollo Clinic & Emergency",
    type: "hospital",
    distanceMeters: 900,
    walkTimeMinutes: 11,
    isOpen: true,
    address: "Near Jayanagar Metro Station",
    phone: "+91 80 4030 4030",
    isVerified: true,
    coordinates: { lat: 12.93, lng: 77.585 },
  },
];

export const mockCommunityReports: IncidentReport[] = [
  {
    id: "r1",
    category: "Lighting",
    description: "Streetlights not working on 14th Cross road after 8 PM. Area gets very dark.",
    locationName: "3rd Block, Jayanagar",
    timestamp: "12 mins ago",
    upvotes: 24,
    severity: "medium",
  },
  {
    id: "r2",
    category: "Isolation",
    description: "Construction detour makes the back alley completely isolated after 9 PM.",
    locationName: "Near Metro Pillar 142",
    timestamp: "45 mins ago",
    upvotes: 18,
    severity: "high",
  },
  {
    id: "r3",
    category: "Blocked paths",
    description: "Sidewalk blocked by construction debris, forced to walk on main road with heavy traffic.",
    locationName: "10th Main Rd",
    timestamp: "2 hours ago",
    upvotes: 9,
    severity: "low",
  },
];

// Backend API Service calls
export const safetyApi = {
  // AI Chat Assistant
  async sendAiMessage(message: string, history: ChatMessage[]): Promise<ChatMessage> {
    try {
      const response = await apiClient.post<{ reply: string; assessment?: any }>("/ai/chat", {
        message,
        history,
      });
      return {
        sender: "saathi",
        text: response.data.reply,
        assessment: response.data.assessment,
      };
    } catch {
      // Offline / Fallback response
      const lower = message.toLowerCase();
      let reply = "I am monitoring your surroundings and safety route. You are not alone.";
      let level: "SAFE" | "ELEVATED" | "CRITICAL" = "SAFE";

      if (lower.includes("follow") || lower.includes("chase") || lower.includes("scared")) {
        reply =
          "I understand. Stay calm and head toward a populated, well-lit location.\n\nI have identified 3 verified safe places within 5 minutes. Would you like me to guide you?";
        level = "ELEVATED";
      } else if (lower.includes("help") || lower.includes("danger") || lower.includes("emergency")) {
        reply = "Emergency detected! Please tap Emergency SOS or seek immediate shelter at the nearest safe point.";
        level = "CRITICAL";
      }

      return {
        sender: "saathi",
        text: reply,
        assessment: {
          level,
          recommendedAction: "Move towards Green Pharmacy (240m away, verified safe location)",
        },
      };
    }
  },

  // Get Nearby Safe Places
  async getSafePlaces(lat?: number, lng?: number): Promise<SafePlace[]> {
    try {
      const res = await apiClient.get<SafePlace[]>("/places/nearby", { params: { lat, lng } });
      return res.data;
    } catch {
      return mockSafePlaces;
    }
  },

  // Trigger Emergency SOS
  async triggerSos(payload: { lat: number; lng: number; reason?: string }) {
    try {
      const res = await apiClient.post("/sos/trigger", payload);
      return res.data;
    } catch {
      return { status: "simulated_success", message: "SOS broadcast simulated to emergency network and contacts" };
    }
  },

  // Submit Community Report
  async submitReport(report: Partial<IncidentReport>): Promise<IncidentReport> {
    try {
      const res = await apiClient.post<IncidentReport>("/reports", report);
      return res.data;
    } catch {
      const newReport: IncidentReport = {
        id: `r_${Date.now()}`,
        category: report.category || "Lighting",
        description: report.description || "",
        locationName: report.locationName || "Current Location",
        timestamp: "Just now",
        upvotes: 1,
        severity: report.severity || "medium",
      };
      return newReport;
    }
  },

  // Get Community Reports
  async getReports(): Promise<IncidentReport[]> {
    try {
      const res = await apiClient.get<IncidentReport[]>("/reports");
      return res.data;
    } catch {
      return mockCommunityReports;
    }
  },
};
