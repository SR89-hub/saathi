import React, { useState } from "react";
import { IncidentReport, ScreenId } from "../../types";
import { BottomNav } from "../BottomNav";

interface CommunityScreenProps {
  reports: IncidentReport[];
  onOpenReportModal: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  reports,
  onOpenReportModal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "reports">("overview");

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
            <h3 className="font-extrabold text-sm text-slate-900">Community Safety</h3>
            <p className="text-[10px] text-slate-400">Jayanagar Area Intelligence</p>
          </div>
        </div>

        <button
          onClick={onOpenReportModal}
          className="bg-teal-800 hover:bg-teal-900 active:scale-95 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 transition-all"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          <span>Report Hazard</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto no-scrollbar pb-6">
        {/* Toggle switch */}
        <div className="bg-slate-200/80 p-1 rounded-2xl flex text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeTab === "overview"
                ? "bg-white text-slate-900 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Safety Insights
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeTab === "reports"
                ? "bg-white text-slate-900 font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Recent Incident Feed ({reports.length})
          </button>
        </div>

        {activeTab === "overview" ? (
          <>
            {/* Risk Breakdown Card */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-slate-900 text-xs">
                  Recurring Hazards Breakdown
                </h4>
                <span className="text-[10px] text-slate-400">Past 30 days</span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-lightbulb text-amber-500 text-[11px]"></i>
                      <span>Poor Lighting</span>
                    </span>
                    <span className="font-bold text-red-600">38%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: "38%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-bus text-orange-500 text-[11px]"></i>
                      <span>Transport Unavailability</span>
                    </span>
                    <span className="font-bold text-orange-500">27%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full rounded-full" style={{ width: "27%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-tree text-teal-600 text-[11px]"></i>
                      <span>Isolated Areas</span>
                    </span>
                    <span className="font-bold text-teal-700">21%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: "21%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-road-barrier text-blue-500 text-[11px]"></i>
                      <span>Blocked Pedestrian Paths</span>
                    </span>
                    <span className="font-bold text-blue-600">14%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Predictive Insight */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                <i className="fa-solid fa-brain text-amber-700"></i>
                <span>AI Heatmap Advisory</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Incidents regarding low visibility are concentrated between <strong>9:00 PM – 11:30 PM</strong> near 3rd Block main cross. We advise using 10th Main illuminated corridor.
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-2.5">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${
                        report.severity === "high"
                          ? "bg-red-100 text-red-700"
                          : report.severity === "medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {report.category}
                    </span>
                    <span className="text-[10px] text-slate-400">• {report.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
                    <i className="fa-solid fa-thumbs-up text-[10px]"></i>
                    <span>{report.upvotes}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-snug">{report.description}</p>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
                  <i className="fa-solid fa-location-dot text-slate-400"></i>
                  <span>{report.locationName}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => onNavigate("5")}
          className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-map-location-dot text-teal-700"></i>
          <span>View Verified Places On Map</span>
        </button>
      </div>

      <BottomNav activeTab="community" onNavigate={onNavigate} />
    </div>
  );
};
