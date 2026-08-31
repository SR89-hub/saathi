import React, { useState } from "react";
import { SafePlace, ScreenId } from "../../types";

interface SafePlacesScreenProps {
  places: SafePlace[];
  onSelectPlace: (place: SafePlace) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SafePlacesScreen: React.FC<SafePlacesScreenProps> = ({
  places,
  onSelectPlace,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<string>("all");

  const filteredPlaces = places.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-xs z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate("4")}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Verified Safe Places</h3>
            <p className="text-[10px] text-slate-400">Jayanagar Zone • 4 Available</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("9")}
          className="text-teal-800 text-xs font-bold hover:underline"
        >
          Insights
        </button>
      </div>

      {/* Interactive Simulated Radar Map */}
      <div className="h-44 bg-slate-900 relative overflow-hidden border-b border-slate-200 flex items-center justify-center select-none">
        {/* Radar concentric circles */}
        <div className="absolute w-64 h-64 rounded-full border border-teal-500/20"></div>
        <div className="absolute w-44 h-44 rounded-full border border-teal-500/30"></div>
        <div className="absolute w-24 h-24 rounded-full border border-teal-500/40"></div>

        {/* Radar sweep */}
        <div className="absolute w-64 h-64 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-tr from-teal-500/20 via-transparent to-transparent radar-sweep origin-center"></div>
        </div>

        {/* Map grid streets */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-700/60" strokeWidth="2">
          <line x1="0" y1="50" x2="360" y2="70" />
          <line x1="140" y1="0" x2="160" y2="200" />
          <line x1="0" y1="120" x2="360" y2="110" />
          <line x1="260" y1="0" x2="280" y2="200" />
        </svg>

        {/* Safe place map pins */}
        {places.map((place, i) => (
          <div
            key={place.id}
            onClick={() => {
              onSelectPlace(place);
              onNavigate("6");
            }}
            className={`absolute cursor-pointer hover:scale-125 transition-all p-1.5 rounded-full shadow-lg border border-white/40 flex items-center justify-center ${
              i === 0
                ? "top-8 left-12 bg-emerald-600 text-white animate-bounce"
                : i === 1
                ? "top-14 right-16 bg-blue-600 text-white"
                : i === 2
                ? "bottom-8 left-20 bg-slate-800 text-white"
                : "bottom-10 right-10 bg-red-600 text-white"
            }`}
            title={place.name}
          >
            <i
              className={`text-xs ${
                place.type === "pharmacy"
                  ? "fa-solid fa-plus"
                  : place.type === "police"
                  ? "fa-solid fa-building-shield"
                  : place.type === "hospital"
                  ? "fa-solid fa-hospital"
                  : "fa-solid fa-shield"
              }`}
            ></i>
          </div>
        ))}

        {/* User position */}
        <div className="relative flex items-center justify-center z-10">
          <span className="w-7 h-7 bg-teal-400/40 rounded-full animate-ping absolute"></span>
          <span className="w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow-lg"></span>
        </div>

        <div className="absolute top-2.5 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-teal-300 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Radar Scanning</span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="px-3 py-2 bg-white border-b border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: "all", label: "All Spots" },
          { id: "pharmacy", label: "Pharmacies" },
          { id: "security", label: "Security Desks" },
          { id: "police", label: "Police" },
          { id: "hospital", label: "Hospitals" },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              filter === c.id
                ? "bg-teal-800 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Places List */}
      <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto no-scrollbar pb-6">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            onClick={() => {
              onSelectPlace(place);
              onNavigate("6");
            }}
            className={`bg-white border rounded-2xl p-3 flex items-center justify-between shadow-xs cursor-pointer hover:border-teal-500 active:scale-98 transition-all ${
              place.badgeText ? "border-teal-500/70 bg-teal-50/20" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-xs ${
                  place.type === "pharmacy"
                    ? "bg-emerald-800 text-white"
                    : place.type === "police"
                    ? "bg-slate-900 text-white"
                    : place.type === "hospital"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                <i
                  className={`${
                    place.type === "pharmacy"
                      ? "fa-solid fa-plus"
                      : place.type === "police"
                      ? "fa-solid fa-building-shield"
                      : place.type === "hospital"
                      ? "fa-solid fa-hospital"
                      : "fa-solid fa-shield"
                  }`}
                ></i>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">{place.name}</p>
                  {place.isVerified && (
                    <i className="fa-solid fa-circle-check text-[10px] text-teal-600"></i>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {place.distanceMeters}m · {place.walkTimeMinutes} min walk ·{" "}
                  <span className="text-emerald-600 font-bold">Open</span>
                </p>
                {place.badgeText && (
                  <span className="inline-block text-[9px] text-teal-800 font-bold bg-teal-100/80 px-2 py-0.5 rounded-md mt-1">
                    {place.badgeText}
                  </span>
                )}
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-700">
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
