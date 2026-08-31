export type ScreenId =
  | "1" // Onboarding
  | "2" // Home
  | "3" // AI Chat
  | "4" // Safety Assessment
  | "5" // Safe Places
  | "6" // Navigation
  | "7" // Trusted Contact
  | "8" // Timeline
  | "9" // Community Intelligence
  | "10"; // Profile

export type ThreatLevel = "SAFE" | "ELEVATED" | "CRITICAL";

export interface ChatMessage {
  id?: string;
  sender: "saathi" | "user" | "system";
  text: string;
  timestamp?: string;
  assessment?: {
    level: ThreatLevel;
    recommendedAction: string;
  };
}

export interface SafePlace {
  id: string;
  name: string;
  type: "pharmacy" | "police" | "hospital" | "security" | "store";
  distanceMeters: number;
  walkTimeMinutes: number;
  isOpen: boolean;
  address: string;
  phone?: string;
  isVerified: boolean;
  badgeText?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  avatarUrl: string;
  isSharingActive: boolean;
}

export interface IncidentReport {
  id: string;
  category: "Lighting" | "Transport" | "Isolation" | "Blocked paths" | "Harassment";
  description: string;
  locationName: string;
  timestamp: string;
  upvotes: number;
  severity: "low" | "medium" | "high";
}

export interface SafetyTimelineEvent {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: "warning" | "info" | "success" | "neutral";
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  primaryContact: TrustedContact;
  safetyScore: number;
}
