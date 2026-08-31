import React from "react";
import { ScreenId } from "../../types";

interface OnboardingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onEmergency: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onNavigate,
  onEmergency,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 text-center h-full bg-gradient-to-b from-slate-50 to-teal-50/40 relative">
      <div className="w-full flex flex-col items-center mt-3">
        <div className="w-16 h-16 bg-teal-800 text-teal-100 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-lg shadow-teal-900/20">
          <i className="fa-solid fa-shield-cat"></i>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">SAATHI</h2>
        <p className="text-xs font-bold text-teal-800 tracking-wide mt-0.5 uppercase">
          Your Safety Co-Pilot
        </p>
        <p className="text-xs text-slate-500 max-w-[240px] mt-3 leading-relaxed">
          Proactive protection, verified safe havens, and smart AI companion. Because your safety shouldn't begin with an SOS.
        </p>
      </div>

      <div className="w-full h-44 my-2 rounded-3xl overflow-hidden relative shadow-md bg-gradient-to-b from-amber-100 via-teal-800 to-slate-950 flex items-end justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent"></div>
        <div className="relative z-10 mb-4 text-center text-white">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-1.5 border border-white/30">
            <i className="fa-solid fa-person-walking text-xl"></i>
          </div>
          <p className="text-[10px] tracking-widest font-semibold uppercase opacity-90">
            Always by your side
          </p>
        </div>
      </div>

      <div className="w-full space-y-2.5 z-10 pb-2">
        <button
          onClick={() => onNavigate("2")}
          className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-2xl flex items-center justify-between px-5 shadow-lg shadow-teal-900/20 active:scale-98 transition-all"
        >
          <span className="flex items-center gap-2.5 text-sm font-bold">
            <i className="fa-solid fa-shield-halved text-teal-300"></i> I'm Feeling Unsure
          </span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>

        <button
          onClick={onEmergency}
          className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
        >
          <i className="fa-solid fa-tower-broadcast text-red-500 animate-pulse"></i>
          <span>Emergency SOS</span>
        </button>

        <p className="text-[11px] text-slate-500 pt-1">
          Already protected?{" "}
          <span
            onClick={() => onNavigate("2")}
            className="text-teal-800 font-bold cursor-pointer hover:underline"
          >
            Enter Dashboard
          </span>
        </p>
      </div>
    </div>
  );
};
