import React from "react";
import { ScreenId, UserProfile } from "../../types";
import { BottomNav } from "../BottomNav";

interface ProfileScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Main Profile Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-800 shadow-sm"
              alt="profile"
            />
            <span className="w-4 h-4 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-1 -right-1"></span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">{user.name}</h3>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-extrabold px-2 py-0.5 rounded-full border border-teal-200">
                PRO ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <p className="text-[10px] text-slate-400">{user.phone}</p>
          </div>
        </div>

        {/* Safety Score Meter */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
              Safety Readiness Index
            </span>
            <h4 className="text-xl font-black mt-0.5">{user.safetyScore}% Prepared</h4>
            <p className="text-[11px] text-teal-200/80 mt-0.5">
              1 Primary Contact • Geofencing Live
            </p>
          </div>

          <div className="w-12 h-12 rounded-full border-4 border-teal-400 flex items-center justify-center font-black text-sm">
            {user.safetyScore}
          </div>
        </div>

        {/* Settings Navigation Menu */}
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-xs text-xs overflow-hidden">
          <div
            onClick={() => onNavigate("7")}
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                <i className="fa-solid fa-user-group text-xs"></i>
              </div>
              <span>Trusted Emergency Contacts</span>
            </div>
            <span className="text-xs font-bold text-teal-800 flex items-center gap-1">
              Rahul <i className="fa-solid fa-chevron-right text-[10px] text-slate-400 ml-1"></i>
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <i className="fa-solid fa-sliders text-xs"></i>
              </div>
              <span>Safety Preferences & Alerts</span>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-xs"></i>
              </div>
              <span>Privacy & Geolocation Rights</span>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3 text-slate-800 font-semibold">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <i className="fa-solid fa-circle-question text-xs"></i>
              </div>
              <span>24/7 Helpline & Support</span>
            </div>
            <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-2xl transition-all shadow-xs"
        >
          Sign Out / Reset Session
        </button>
      </div>

      <BottomNav activeTab="" onNavigate={onNavigate} />
    </div>
  );
};
