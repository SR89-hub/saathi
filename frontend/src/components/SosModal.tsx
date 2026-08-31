import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { safetyApi } from "../services/api";

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlertSent?: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onAlertSent }) => {
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState<"countdown" | "dispatched">("countdown");

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setStatus("countdown");
      return;
    }

    if (countdown > 0 && status === "countdown") {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && status === "countdown") {
      setStatus("dispatched");
      safetyApi.triggerSos({
        lat: 12.925,
        lng: 77.5938,
        reason: "User activated SOS button",
      });
      if (onAlertSent) onAlertSent();
    }
  }, [isOpen, countdown, status, onAlertSent]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border-4 border-red-500 relative overflow-hidden"
        >
          {status === "countdown" ? (
            <>
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-75"></div>
                <div className="relative w-20 h-20 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shadow-lg sos-pulse">
                  <span className="text-3xl font-black">{countdown}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider">Seconds</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  Emergency SOS Triggered
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  Sending your live GPS & auto-calling <strong>Helpline 112</strong> & <strong>Rahul</strong>.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setStatus("dispatched");
                    safetyApi.triggerSos({ lat: 12.925, lng: 77.5938 });
                    if (onAlertSent) onAlertSent();
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-lg uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-bolt"></i> Send Immediately
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  I'm Safe (Cancel SOS)
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                <i className="fa-solid fa-tower-broadcast animate-pulse"></i>
              </div>

              <div>
                <div className="inline-block bg-red-100 text-red-700 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full mb-1">
                  Live Dispatch Active
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  SOS Dispatched to 112 & Contacts
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  ✓ GPS Coordinates broadcasted<br />
                  ✓ Emergency SMS sent to Rahul (+91 98765 43210)<br />
                  ✓ Nearest responder notified
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-left text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Battery Level:</span>
                  <span className="font-bold text-slate-800">84%</span>
                </div>
                <div className="flex justify-between">
                  <span>Location Accuracy:</span>
                  <span className="font-bold text-emerald-600">±3 meters</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Close SOS Window
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
