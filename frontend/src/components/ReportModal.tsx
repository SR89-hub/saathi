import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IncidentReport } from "../types";
import { safetyApi } from "../services/api";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportCreated: (report: IncidentReport) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onReportCreated,
}) => {
  const [category, setCategory] = useState<IncidentReport["category"]>("Lighting");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("3rd Block, Jayanagar");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: IncidentReport["category"][] = [
    "Lighting",
    "Transport",
    "Isolation",
    "Blocked paths",
    "Harassment",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const newReport = await safetyApi.submitReport({
        category,
        description,
        locationName,
        severity,
      });
      onReportCreated(newReport);
      setDescription("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-slate-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-sm">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Report Safety Concern
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Category
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                      category === cat
                        ? "bg-teal-800 text-white border-teal-800 shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Location
              </label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-3 top-2.5 text-slate-400"></i>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Street lamps broken, low visibility, no crowd..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Risk Severity
              </label>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`flex-1 py-1.5 rounded-xl uppercase font-bold text-[10px] border transition-all ${
                      severity === sev
                        ? sev === "high"
                          ? "bg-red-600 text-white border-red-600 shadow"
                          : sev === "medium"
                          ? "bg-amber-500 text-white border-amber-500 shadow"
                          : "bg-emerald-600 text-white border-emerald-600 shadow"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
