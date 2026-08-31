import React from "react";
import { ScreenId, SafetyTimelineEvent } from "../../types";
import { BottomNav } from "../BottomNav";

interface TimelineScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({ onNavigate }) => {
  const events: SafetyTimelineEvent[] = [
    {
      id: "1",
      time: "8:42 PM",
      title: "Safety Mode Activated",
      subtitle: "Route vigilance initiated automatically",
      icon: "fa-solid fa-power-off",
      type: "warning",
    },
    {
      id: "2",
      time: "8:43 PM",
      title: "Feeling Unsafe Logged",
      subtitle: "AI assessment classified threat as ELEVATED",
      icon: "fa-solid fa-triangle-exclamation",
      type: "warning",
    },
    {
      id: "3",
      time: "8:44 PM",
      title: "Safe Haven Identified",
      subtitle: "Green Pharmacy (240m away, Open 24/7)",
      icon: "fa-solid fa-location-dot",
      type: "info",
    },
    {
      id: "4",
      time: "8:45 PM",
      title: "Live GPS Link Shared",
      subtitle: "Rahul (+91 98765 43210) joined tracking session",
      icon: "fa-solid fa-share-nodes",
      type: "info",
    },
    {
      id: "5",
      time: "8:48 PM",
      title: "Safe Arrival Confirmed",
      subtitle: "Geofence reached at Green Pharmacy",
      icon: "fa-solid fa-circle-check",
      type: "success",
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-xs z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate("2")}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Safety Timeline</h3>
            <p className="text-[10px] text-slate-400">Audit Trail • Today's Session</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Resolved
        </span>
      </div>

      {/* Timeline List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-5 py-2">
          {events.map((event) => (
            <div key={event.id} className="relative pl-6 group">
              <div
                className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm border-2 border-white ${
                  event.type === "warning"
                    ? "bg-amber-500 text-white"
                    : event.type === "success"
                    ? "bg-teal-700 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                <i className={event.icon}></i>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400">{event.time}</span>
                <p className="text-xs font-bold text-slate-900 leading-snug">{event.title}</p>
                {event.subtitle && (
                  <p className="text-[11px] text-slate-500 mt-0.5">{event.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completion summary card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 text-emerald-950 flex items-start gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
            <i className="fa-solid fa-shield-check"></i>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-900">
              Safety Session Complete
            </p>
            <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
              You safely reached your designated shelter point. Your emergency contact has been notified of your safe status.
            </p>
          </div>
        </div>

        {/* Community insights button */}
        <button
          onClick={() => onNavigate("9")}
          className="w-full py-3 bg-teal-800 hover:bg-teal-900 active:scale-98 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Explore Community Intelligence</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>

      <BottomNav activeTab="timeline" onNavigate={onNavigate} />
    </div>
  );
};
