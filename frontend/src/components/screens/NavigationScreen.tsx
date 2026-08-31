import React, { useState } from "react";
import { SafePlace, ScreenId } from "../../types";

interface NavigationScreenProps {
  place: SafePlace;
  onNavigate: (screen: ScreenId) => void;
  onShareLocation: () => void;
}

export const NavigationScreen: React.FC<NavigationScreenProps> = ({
  place,
  onNavigate,
  onShareLocation,
}) => {
  const [navStarted, setNavStarted] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-xs z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate("5")}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Safe Route Navigation</h3>
            <p className="text-[10px] text-slate-400">Target: {place.name}</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
          Lit Route
        </span>
      </div>

      {/* Map Route Guidance */}
      <div className="h-56 bg-slate-950 relative overflow-hidden border-b border-slate-200 flex items-center justify-center select-none">
        {/* Street Lines */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800" strokeWidth="6">
          <line x1="20" y1="210" x2="140" y2="150" />
          <line x1="140" y1="150" x2="250" y2="130" />
          <line x1="250" y1="130" x2="290" y2="50" />
        </svg>

        {/* Lit Safe Path glowing overlay */}
        <svg className="absolute inset-0 w-full h-full" strokeWidth="4">
          <path
            d="M 60 190 L 140 150 L 230 130 L 270 60"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="5"
            strokeDasharray="8,6"
            className="animate-pulse"
          />
        </svg>

        {/* User live position indicator */}
        <div className="absolute bottom-12 left-12 flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-6 h-6 bg-teal-400/40 rounded-full animate-ping absolute"></span>
            <div className="w-5 h-5 bg-teal-500 border-2 border-white rounded-full shadow-lg"></div>
          </div>
          <span className="text-[10px] font-bold bg-white/95 text-slate-900 px-2 py-0.5 rounded-md shadow-sm">
            You
          </span>
        </div>

        {/* Safe destination marker */}
        <div className="absolute top-8 right-14 flex flex-col items-center">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-sm shadow-xl border-2 border-white animate-bounce">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <span className="text-[10px] font-black bg-emerald-900/90 text-emerald-100 px-2 py-0.5 rounded-md shadow-sm mt-1 whitespace-nowrap">
            {place.name}
          </span>
        </div>

        <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-200">
          <i className="fa-solid fa-person-walking text-teal-400 mr-1"></i>
          <strong>3 min</strong> (240m)
        </div>
      </div>

      {/* Place details and actions */}
      <div className="flex-1 p-4 bg-white flex flex-col justify-between shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-sm">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-extrabold text-slate-900">{place.name}</h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  OPEN
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{place.address}</p>
              <p className="text-[11px] text-teal-800 font-semibold mt-0.5">
                ✓ 24/7 Security Guarded • High Visibility
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setNavStarted(true);
              onNavigate("7");
            }}
            className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 active:scale-98 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-route"></i>
            <span>{navStarted ? "Route In Progress • Share Status" : "Start Live Guided Route"}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
          <button
            onClick={onShareLocation}
            className="py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-share-nodes text-teal-700"></i>
            <span>Share Live Link</span>
          </button>

          <a
            href={`tel:${place.phone || "112"}`}
            className="py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
          >
            <i className="fa-solid fa-phone text-teal-700"></i>
            <span>Call Safe Spot</span>
          </a>
        </div>
      </div>
    </div>
  );
};
