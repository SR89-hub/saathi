import React from "react";
import { ScreenId } from "../../types";

interface SafetyAssessmentScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onEmergency: () => void;
}

export const SafetyAssessmentScreen: React.FC<SafetyAssessmentScreenProps> = ({
  onNavigate,
  onEmergency,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-slate-200 bg-white shadow-xs z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("3")}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Safety Assessment</h3>
            <p className="text-[10px] text-slate-400">AI Environmental Analysis</p>
          </div>
        </div>
        <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full animate-pulse">
          ELEVATED RISK
        </span>
      </div>

      {/* Main Analysis */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto no-scrollbar">
        {/* Risk Indicators Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-base flex-shrink-0">
              <i className="fa-solid fa-person-running"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Threat Detected
              </p>
              <p className="text-xs font-black text-slate-900">Possible Stalking / Foot Tracking</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pacing mismatch detected in consecutive street corners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base flex-shrink-0">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Environment Factors
              </p>
              <p className="text-xs font-bold text-slate-800">Low Street Illumination (38% Reports)</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Current stretch has 3 reported unlit lamp posts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-base flex-shrink-0">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Recommended Action
              </p>
              <p className="text-xs font-bold text-teal-900">
                Divert immediately to Green Pharmacy (240m)
              </p>
            </div>
          </div>
        </div>

        {/* Live Safety Advice Pill */}
        <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-teal-900 font-extrabold text-xs">
            <i className="fa-solid fa-circle-info text-teal-700"></i>
            <span>Co-Pilot Guidance</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Keep your phone in hand, stay on populated sidewalks, and avoid secluded alley shortcuts. We are tracking your distance to the nearest safe sanctuary.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => onNavigate("5")}
            className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 active:scale-98 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-900/15 transition-all"
          >
            <span>Proceed to Safe Places</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>

          <button
            onClick={onEmergency}
            className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-phone"></i>
            <span>I Need Immediate Help (SOS)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
