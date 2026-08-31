import React, { useState } from "react";
import { ScreenId, TrustedContact } from "../../types";

interface TrustedContactScreenProps {
  contact: TrustedContact;
  onNavigate: (screen: ScreenId) => void;
  onSessionStarted: () => void;
}

export const TrustedContactScreen: React.FC<TrustedContactScreenProps> = ({
  contact,
  onNavigate,
  onSessionStarted,
}) => {
  const [isShared, setIsShared] = useState(false);

  const handleShare = () => {
    setIsShared(true);
    onSessionStarted();
    setTimeout(() => {
      onNavigate("8");
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-xs z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate("6")}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Trusted Safety Contact</h3>
            <p className="text-[10px] text-slate-400">Live GPS Session Sharing</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Contact Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={contact.avatarUrl}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                  alt="contact"
                />
                <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-slate-900">{contact.name}</h4>
                  <span className="text-[9px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-md">
                    PRIMARY
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{contact.phone}</p>
                <p className="text-[10px] text-slate-400">{contact.relationship}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("10")}
              className="text-xs text-teal-800 font-bold hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Privacy & Safety Explanation */}
          <div className="bg-gradient-to-b from-teal-50/70 to-slate-100/50 rounded-3xl border border-teal-100 p-5 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto text-xl shadow-xs">
              <i className="fa-solid fa-satellite-dish animate-pulse"></i>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
              Share real-time GPS with {contact.name}?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[250px] mx-auto">
              Your contact will receive a secure web link showing your live moving route until you safely arrive at your destination.
            </p>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl text-[11px] text-slate-600">
            <i className="fa-solid fa-lock text-teal-700"></i>
            <span>End-to-End Encrypted live session. Auto-expires in 1 hour.</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2.5 pb-3">
          <button
            onClick={handleShare}
            disabled={isShared}
            className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 active:scale-98 text-white font-bold text-xs rounded-2xl shadow-lg shadow-teal-900/15 transition-all flex items-center justify-center gap-2"
          >
            {isShared ? (
              <>
                <i className="fa-solid fa-circle-check text-emerald-300"></i>
                <span>Location Shared! Redirecting...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-share-nodes"></i>
                <span>Yes, Share Live Location</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate("8")}
            className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl transition-colors"
          >
            Proceed Without Sharing
          </button>
        </div>
      </div>
    </div>
  );
};
