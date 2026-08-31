import React from "react";
import { ScreenId, UserProfile } from "../../types";
import { BottomNav } from "../BottomNav";

interface HomeScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onEmergency: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigate,
  onEmergency,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Header */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center text-sm shadow-sm">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div>
            <span className="font-black text-sm tracking-wider text-slate-800">SAATHI</span>
            <span className="text-[9px] block text-emerald-600 font-bold uppercase tracking-widest leading-none">
              ● Active Guard
            </span>
          </div>
        </div>
        <img
          onClick={() => onNavigate("10")}
          src={user.avatarUrl}
          className="w-8 h-8 rounded-full object-cover border-2 border-teal-700 cursor-pointer shadow-sm hover:scale-105 transition-transform"
          alt="profile"
          title="Account Settings"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto no-scrollbar">
        {/* Location pill */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs shadow-xs hover:border-teal-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center text-sm">
              <i className="fa-solid fa-location-crosshairs"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Current Location
              </p>
              <p className="text-xs font-bold text-slate-800">Jayanagar, Bengaluru</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Safe Zone
          </span>
        </div>

        {/* Safety Status Hero */}
        <div className="text-center py-4 px-4 bg-gradient-to-b from-teal-50/80 to-emerald-50/40 rounded-3xl border border-teal-100/80 shadow-xs relative overflow-hidden">
          <div className="relative w-14 h-14 mx-auto mb-2 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping"></div>
            <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-xl shadow-inner font-bold">
              <i className="fa-solid fa-shield-check"></i>
            </div>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">You're Protected</h3>
          <p className="text-xs text-slate-500 max-w-[220px] mx-auto mt-0.5">
            Real-time hazard monitoring is active. Tap below if anything feels off.
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-2.5">
          <div
            onClick={() => onNavigate("3")}
            className="bg-teal-800 hover:bg-teal-900 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md shadow-teal-900/10 cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-base">
                <i className="fa-solid fa-microphone-lines animate-pulse"></i>
              </div>
              <div>
                <p className="text-xs font-bold">Talk to AI Safety Co-Pilot</p>
                <p className="text-[10px] text-teal-200">"Someone is following me..."</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-teal-200"></i>
          </div>

          <div
            onClick={() => onNavigate("5")}
            className="bg-white border border-slate-200 hover:border-teal-300 p-3.5 rounded-2xl flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center text-base">
                <i className="fa-solid fa-map-pin"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Nearby Safe Havens</p>
                <p className="text-[10px] text-slate-500">4 verified open places within 500m</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </div>

          <div
            onClick={() => onNavigate("7")}
            className="bg-white border border-slate-200 hover:border-teal-300 p-3.5 rounded-2xl flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-base">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Share Live Route</p>
                <p className="text-[10px] text-slate-500">With {user.primaryContact.name} ({user.primaryContact.phone})</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </div>

          <div
            onClick={onEmergency}
            className="bg-red-50 hover:bg-red-100/80 border border-red-200 p-3.5 rounded-2xl flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center text-base shadow-sm">
                <i className="fa-solid fa-tower-broadcast animate-pulse"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-red-700">Instant Emergency SOS</p>
                <p className="text-[10px] text-red-500">Auto-call Helpline 112 & dispatch GPS</p>
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-red-400"></i>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="home" onNavigate={onNavigate} />
    </div>
  );
};
