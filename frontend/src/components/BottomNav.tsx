import React from "react";
import { ScreenId } from "../types";

interface BottomNavProps {
  activeTab: "home" | "map" | "timeline" | "community" | "";
  onNavigate: (screen: ScreenId) => void;
  reportCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  reportCount = 3,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-5 py-2.5 flex justify-between items-center text-[11px] text-slate-400 select-none shadow-sm z-30">
      <button
        onClick={() => onNavigate("2")}
        className={`flex flex-col items-center gap-0.5 transition-all ${
          activeTab === "home"
            ? "text-teal-800 font-bold scale-105"
            : "hover:text-slate-600"
        }`}
      >
        <i className="fa-solid fa-house text-base"></i>
        <span>Home</span>
      </button>

      <button
        onClick={() => onNavigate("5")}
        className={`flex flex-col items-center gap-0.5 transition-all ${
          activeTab === "map"
            ? "text-teal-800 font-bold scale-105"
            : "hover:text-slate-600"
        }`}
      >
        <i className="fa-solid fa-map-location-dot text-base"></i>
        <span>Safe Map</span>
      </button>

      <button
        onClick={() => onNavigate("8")}
        className={`flex flex-col items-center gap-0.5 transition-all ${
          activeTab === "timeline"
            ? "text-teal-800 font-bold scale-105"
            : "hover:text-slate-600"
        }`}
      >
        <i className="fa-solid fa-clock-rotate-left text-base"></i>
        <span>Timeline</span>
      </button>

      <button
        onClick={() => onNavigate("9")}
        className={`flex flex-col items-center gap-0.5 transition-all relative ${
          activeTab === "community"
            ? "text-teal-800 font-bold scale-105"
            : "hover:text-slate-600"
        }`}
      >
        {reportCount > 0 && (
          <span className="absolute -top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        )}
        <i className="fa-solid fa-users-viewfinder text-base"></i>
        <span>Community</span>
      </button>
    </div>
  );
};
