import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("1");
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  const [chatMessages, setChatMessages] = useState([
    { sender: "saathi", text: "Hi, I'm SAATHI. How are you feeling right now?" },
    { sender: "user", text: "Someone has been following me since the last turn." },
    {
      sender: "saathi",
      text: "I understand. You don't need to explain more. I can help you find a verified safe location nearby.\n\nWould you like me to show you the options?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendChat = () => {
    if (!inputValue.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: inputValue.trim() }]);
    setInputValue("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "saathi",
          text: "I am constantly monitoring your route and nearby emergency points. Let's get you to a safe spot.",
        },
      ]);
    }, 1000);
  };

  const switchScreen = (screenId: string) => {
    setCurrentScreen(screenId);
  };

  const getBottomNav = (activeTab: string) => (
    <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center text-xs text-slate-400">
      <div
        onClick={() => switchScreen("2")}
        className={`flex flex-col items-center cursor-pointer ${
          activeTab === "home" ? "text-brand-800 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-house text-sm mb-0.5"></i>Home
      </div>
      <div
        onClick={() => switchScreen("5")}
        className={`flex flex-col items-center cursor-pointer ${
          activeTab === "map" ? "text-brand-800 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-map-location-dot text-sm mb-0.5"></i>Map
      </div>
      <div
        onClick={() => switchScreen("8")}
        className={`flex flex-col items-center cursor-pointer ${
          activeTab === "timeline" ? "text-brand-800 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-clock-rotate-left text-sm mb-0.5"></i>Timeline
      </div>
      <div
        onClick={() => switchScreen("9")}
        className={`flex flex-col items-center cursor-pointer ${
          activeTab === "community" ? "text-brand-800 font-bold" : ""
        }`}
      >
        <i className="fa-solid fa-users text-sm mb-0.5"></i>Community
      </div>
    </div>
  );

  const [emergencyActive, setEmergencyActive] = useState(false);
  const triggerEmergency = () => {
    setEmergencyActive(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "1":
        return (
          <div className="flex-1 flex flex-col items-center justify-between p-6 text-center h-full bg-slate-50 relative">
            <div className="w-full flex flex-col items-center mt-3">
              <div className="w-14 h-14 bg-teal-800 text-teal-100 rounded-full flex items-center justify-center text-2xl mb-3 shadow-lg">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">SAATHI</h2>
              <p className="text-xs font-bold text-slate-600 tracking-wide mt-1">Your safety co-pilot</p>
              <p className="text-xs text-slate-500 max-w-[220px] mt-4 leading-normal">
                Because your safety shouldn't begin with an SOS.
              </p>
            </div>
            <div className="w-full h-48 my-3 rounded-2xl overflow-hidden relative shadow-inner bg-gradient-to-b from-amber-100 via-orange-100 to-teal-900 flex items-end justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-85"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/20 to-transparent"></div>
              <div className="relative z-10 mb-5 text-center text-white">
                <i className="fa-solid fa-person-walking text-4xl mb-1"></i>
                <p className="text-[10px] tracking-wider font-light uppercase opacity-90">Always by your side</p>
              </div>
            </div>
            <div className="w-full space-y-3 z-10 pb-4">
              <button
                onClick={() => switchScreen("2")}
                className="w-full py-3.5 bg-brand-800 hover:bg-brand-900 text-white font-medium text-xs rounded-xl flex items-center justify-between px-5 shadow-lg active:scale-95 transition-all"
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold">
                  <i className="fa-solid fa-shield-halved"></i> I'm unsure
                </span>
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
              <button
                onClick={triggerEmergency}
                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <i className="fa-solid fa-phone"></i> Emergency SOS
              </button>
              <p className="text-xs text-slate-500 pt-1">
                Already have an account?{" "}
                <span
                  onClick={() => switchScreen("2")}
                  className="text-brand-800 font-bold cursor-pointer hover:underline"
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        );
      case "2":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-5 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-leaf text-brand-800 text-lg"></i>
                <span className="font-extrabold text-sm tracking-wider text-slate-800">SAATHI</span>
              </div>
              <img
                onClick={() => switchScreen("10")}
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                className="w-8 h-8 rounded-full object-cover border-2 border-brand-800 cursor-pointer shadow-sm"
                alt="profile"
              />
            </div>
            <div className="flex-1 p-4 space-y-3.5 overflow-y-auto no-scrollbar">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-brand-800 flex items-center justify-center">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Your location</p>
                    <p className="text-xs font-bold text-slate-800">Jayanagar, Bengaluru</p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
              </div>
              <div className="text-center py-3 bg-teal-50/50 rounded-2xl border border-teal-100">
                <div className="w-12 h-12 bg-teal-100 text-brand-800 rounded-full flex items-center justify-center mx-auto mb-2 text-xl shadow-inner pulse-effect">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="text-sm font-bold text-slate-900">You're Safe</h3>
                <p className="text-xs text-slate-500">Stay aware. We're here for you.</p>
              </div>
              <div className="space-y-2.5">
                <div
                  onClick={() => switchScreen("3")}
                  className="bg-brand-800 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md cursor-pointer hover:bg-brand-900 active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-sm">
                      <i className="fa-solid fa-microphone"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold">Talk to SAATHI</p>
                      <p className="text-[10px] text-teal-200">Describe your situation</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </div>
                <div
                  onClick={() => switchScreen("5")}
                  className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-slate-50 active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-sm">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Find a safe place</p>
                      <p className="text-[10px] text-slate-500">Nearby verified locations</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div
                  onClick={() => switchScreen("7")}
                  className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-slate-50 active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-sm">
                      <i className="fa-solid fa-user-group"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Share location</p>
                      <p className="text-[10px] text-slate-500">With your trusted contact</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div
                  onClick={triggerEmergency}
                  className="bg-red-50 border border-red-200 p-3.5 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:bg-red-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-500 text-white rounded-xl flex items-center justify-center text-sm shadow">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-600">Emergency</p>
                      <p className="text-[10px] text-red-500">Call 112 / Your contacts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {getBottomNav("home")}
          </div>
        );
      case "3":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5">
                <i
                  onClick={() => switchScreen("2")}
                  className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
                ></i>
                <i className="fa-solid fa-leaf text-brand-800 text-base"></i>
                <span className="font-extrabold text-sm tracking-wider text-slate-800">SAATHI</span>
              </div>
              <i className="fa-solid fa-ellipsis-vertical text-sm text-slate-500 cursor-pointer"></i>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs no-scrollbar">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.sender === "saathi"
                      ? "bg-slate-200/80 text-slate-800 rounded-tl-none"
                      : "bg-brand-900 text-white ml-auto rounded-tr-none"
                  } p-3 rounded-2xl max-w-[85%] shadow-sm leading-relaxed whitespace-pre-line`}
                >
                  {msg.text}
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => switchScreen("4")}
                  className="bg-brand-800 hover:bg-brand-900 text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Yes, show me
                </button>
                <button
                  onClick={() => switchScreen("2")}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-medium py-2 px-4 rounded-xl active:scale-95 transition-all"
                >
                  Not now
                </button>
              </div>
            </div>
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-3">
              <button className="text-slate-400 hover:text-brand-800 text-sm">
                <i className="fa-solid fa-microphone"></i>
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={handleSendChat}
                className="w-8 h-8 bg-brand-800 hover:bg-brand-900 rounded-full flex items-center justify-center text-white text-xs shadow"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        );
      case "4":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("3")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <i className="fa-solid fa-leaf text-brand-800 text-base"></i>
              <span className="font-extrabold text-sm tracking-wider text-slate-800">SAATHI</span>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
              <h3 className="text-sm font-extrabold text-slate-900">Safety Assessment</h3>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Situation</p>
                    <p className="text-xs font-extrabold text-slate-800">Possible following</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
                    <span className="inline-block bg-amber-100 text-amber-800 font-extrabold text-xs px-2.5 py-0.5 rounded-md mt-0.5">
                      ELEVATED
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-brand-800 flex items-center justify-center text-sm flex-shrink-0">
                    <i className="fa-solid fa-location-arrow"></i>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Location</p>
                    <p className="text-xs font-bold text-slate-700">Jayanagar, Bengaluru</p>
                  </div>
                </div>
              </div>
              <div className="bg-teal-50 border border-teal-200/70 rounded-2xl p-4">
                <p className="text-xs font-extrabold text-brand-800 mb-1">Recommended Next Step</p>
                <p className="text-xs text-slate-600 leading-normal">
                  Move towards a verified, populated safe location immediately.
                </p>
              </div>
              <button
                onClick={() => switchScreen("5")}
                className="w-full py-3.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all mt-4"
              >
                Find Safe Place <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        );
      case "5":
        return (
          <div className="flex-1 flex flex-col h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("4")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <span className="font-extrabold text-sm text-slate-800">Safe Places Near You</span>
            </div>
            <div className="h-48 bg-emerald-50/70 relative overflow-hidden border-b border-slate-200 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full stroke-slate-300" strokeWidth="4">
                <line x1="0" y1="60" x2="360" y2="80" />
                <line x1="140" y1="0" x2="180" y2="200" />
                <line x1="0" y1="140" x2="360" y2="130" />
              </svg>
              <div
                onClick={() => switchScreen("6")}
                className="absolute top-10 left-12 text-teal-800 text-base cursor-pointer hover:scale-125 transition-all p-1 bg-white rounded-full shadow"
              >
                <i className="fa-solid fa-plus-circle"></i>
              </div>
              <div className="absolute top-20 right-20 text-blue-600 text-base cursor-pointer hover:scale-125 transition-all p-1 bg-white rounded-full shadow">
                <i className="fa-solid fa-building-shield"></i>
              </div>
              <div className="absolute bottom-8 left-24 text-red-500 text-base cursor-pointer hover:scale-125 transition-all p-1 bg-white rounded-full shadow">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <div className="relative flex items-center justify-center z-10">
                <span className="w-6 h-6 bg-blue-500/40 rounded-full animate-ping absolute"></span>
                <span className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></span>
              </div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-slate-700 text-xs hover:bg-slate-100">
                <i className="fa-solid fa-crosshairs"></i>
              </button>
            </div>
            <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto no-scrollbar pb-6">
              <div
                onClick={() => switchScreen("6")}
                className="bg-white border-2 border-teal-600 rounded-2xl p-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-teal-50/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-800 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Green Pharmacy</p>
                    <p className="text-[10px] text-slate-500">
                      240 m · <span className="text-emerald-600 font-bold">Open</span>
                    </p>
                    <span className="inline-block text-[9px] text-teal-800 font-bold bg-teal-100/70 px-2 py-0.5 rounded-md mt-1">
                      Best option (Closest & open)
                    </span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-teal-700"></i>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm shadow">
                    <i className="fa-solid fa-shield"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Campus Security Desk</p>
                    <p className="text-[10px] text-slate-500">
                      430 m · <span className="text-emerald-600 font-bold">Open</span>
                    </p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-800 text-white rounded-xl flex items-center justify-center text-sm shadow">
                    <i className="fa-solid fa-building-shield"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Police Station</p>
                    <p className="text-[10px] text-slate-500">
                      650 m · <span className="text-emerald-600 font-bold">Open</span>
                    </p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-500 text-white rounded-xl flex items-center justify-center text-sm shadow">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Hospital</p>
                    <p className="text-[10px] text-slate-500">
                      900 m · <span className="text-emerald-600 font-bold">Open</span>
                    </p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
              </div>
            </div>
          </div>
        );
      case "6":
        return (
          <div className="flex-1 flex flex-col h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("5")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <span className="font-extrabold text-sm text-slate-800">Safe Pharmacy Navigation</span>
            </div>
            <div className="h-64 bg-emerald-50 relative overflow-hidden border-b border-slate-200 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" strokeWidth="2">
                <path
                  d="M 70 200 L 140 140 L 250 130 L 280 60"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="5"
                  strokeDasharray="8,5"
                />
              </svg>
              <div className="absolute bottom-12 left-14 flex items-center gap-1.5">
                <div className="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-md animate-bounce"></div>
                <span className="text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow">You</span>
              </div>
              <div className="absolute top-10 right-16 text-red-500 text-2xl drop-shadow-md">
                <i className="fa-solid fa-location-dot"></i>
              </div>
            </div>
            <div className="flex-1 p-4 bg-white flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-800 text-white rounded-2xl flex items-center justify-center text-base font-bold shadow">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Green Pharmacy</h4>
                    <p className="text-xs text-slate-500">
                      240 m · 3 min walk · <span className="text-emerald-600 font-bold">Open</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => switchScreen("7")}
                  className="w-full py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Start Route
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => switchScreen("7")}
                  className="py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-share-nodes text-brand-800"></i> Share Location
                </button>
                <button className="py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2">
                  <i className="fa-solid fa-phone text-brand-800"></i> Call
                </button>
              </div>
            </div>
          </div>
        );
      case "7":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("6")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <span className="font-extrabold text-sm text-slate-800">Trusted Contact</span>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                      alt="contact"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Rahul</h4>
                      <p className="text-xs text-slate-500">+91 98765 43210</p>
                    </div>
                  </div>
                  <button className="text-xs text-brand-800 font-bold hover:underline">Edit</button>
                </div>
                <div className="text-center space-y-2 px-2">
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    Would you like to share your live location with your trusted contact?
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    They will be notified only during this active safety session.
                  </p>
                </div>
              </div>
              <div className="space-y-3 pb-6">
                <button
                  onClick={() => switchScreen("8")}
                  className="w-full py-3.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Yes, Share Location
                </button>
                <button
                  onClick={() => switchScreen("8")}
                  className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        );
      case "8":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("7")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <span className="font-extrabold text-sm text-slate-800">Safety Timeline</span>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
              <div className="relative border-l-2 border-slate-300 ml-4 space-y-5 py-2">
                <div className="relative pl-5">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] shadow">
                    <i className="fa-solid fa-power-off"></i>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">8:42 PM</p>
                  <p className="text-xs font-bold text-slate-800">Safety mode activated</p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] shadow">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">8:43 PM</p>
                  <p className="text-xs font-bold text-slate-800">You reported feeling unsafe</p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">8:44 PM</p>
                  <p className="text-xs font-bold text-slate-800">Safe place identified</p>
                  <p className="text-[10px] text-slate-500 font-medium">(Green Pharmacy)</p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow">
                    <i className="fa-solid fa-share"></i>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">8:45 PM</p>
                  <p className="text-xs font-bold text-slate-800">Location sharing enabled</p>
                  <p className="text-[10px] text-slate-500 font-medium">(with Rahul)</p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-teal-800 text-white flex items-center justify-center text-[10px] shadow">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">8:48 PM</p>
                  <p className="text-xs font-bold text-slate-800">You reached your safe point</p>
                </div>
              </div>
              <div className="bg-emerald-100 border border-emerald-300 rounded-2xl p-4 text-emerald-950 flex items-center gap-3 shadow-sm">
                <i className="fa-solid fa-circle-check text-emerald-700 text-2xl"></i>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                    Safety Session Complete
                  </p>
                  <p className="text-xs text-emerald-800 leading-snug">You reached your selected safe location.</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white border-t border-slate-200">
              <button
                onClick={() => switchScreen("9")}
                className="w-full py-2.5 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow"
              >
                Next: Community Intelligence <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        );
      case "9":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-200 bg-white shadow-sm">
              <i
                onClick={() => switchScreen("8")}
                className="fa-solid fa-chevron-left text-sm text-slate-600 cursor-pointer"
              ></i>
              <span className="font-extrabold text-sm text-slate-800">Community Intelligence</span>
            </div>
            <div className="flex-1 p-4 space-y-3.5 overflow-y-auto no-scrollbar">
              <div className="bg-slate-200 p-1 rounded-xl flex text-xs font-semibold text-center">
                <button className="flex-1 bg-white py-1.5 rounded-lg shadow-sm text-slate-900 font-bold">
                  Overview
                </button>
                <button className="flex-1 py-1.5 text-slate-500 hover:text-slate-800">My Reports</button>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Community Safety Insights</h4>
                <p className="text-xs text-slate-500">(Jayanagar Area)</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2.5 shadow-sm">
                <p className="font-bold text-slate-800 text-xs mb-2">Recurring Concerns</p>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Lighting</span>
                    <span className="font-bold text-red-600">38%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: "38%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Transport</span>
                    <span className="font-bold text-orange-500">27%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full rounded-full" style={{ width: "27%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Isolation</span>
                    <span className="font-bold text-teal-700">21%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: "21%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Blocked paths</span>
                    <span className="font-bold text-blue-600">14%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
                <div className="flex items-center gap-1.5 text-amber-800 font-extrabold text-xs mb-1">
                  <i className="fa-solid fa-lightbulb text-amber-600"></i> AI Insight
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  Reports about lighting and low pedestrian activity are concentrated between 9 PM and 11 PM near 3rd Block.
                </p>
              </div>
              <button
                onClick={() => switchScreen("5")}
                className="w-full py-3 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                View Full Map
              </button>
            </div>
            {getBottomNav("community")}
          </div>
        );
      case "10":
        return (
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-800 shadow"
                  alt="profile"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Aditi Sharma</h3>
                  <p className="text-xs text-slate-500">aditi@example.com</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm text-xs">
                <div
                  onClick={() => switchScreen("7")}
                  className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-user-group text-slate-500 w-4"></i>
                    <span>Trusted Contacts</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-sliders text-slate-500 w-4"></i>
                    <span>Safety Preferences</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-language text-slate-500 w-4"></i>
                    <span>Language</span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    English <i className="fa-solid fa-chevron-right text-xs"></i>
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-shield-halved text-slate-500 w-4"></i>
                    <span>Privacy & Security</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-circle-question text-slate-500 w-4"></i>
                    <span>Help & Support</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-3 text-slate-800 font-semibold">
                    <i className="fa-solid fa-circle-info text-slate-500 w-4"></i>
                    <span>About SAATHI</span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
                </div>
              </div>
              <button
                onClick={() => switchScreen("1")}
                className="w-full py-3 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Log Out
              </button>
            </div>
            {getBottomNav("")}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] h-[720px] bg-slate-50 rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-[12px] border-slate-800 relative">
        <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold text-slate-800 bg-transparent z-30 absolute w-full pointer-events-none">
          <span>{currentTime}</span>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-signal text-xs"></i>
            <i className="fa-solid fa-wifi text-xs"></i>
            <i className="fa-solid fa-battery-full text-xs"></i>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden relative pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {emergencyActive && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border-2 border-red-500 animate-bounce">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Emergency SOS Initiated</h3>
              <p className="text-xs text-slate-600">
                Dialing Helpline 112 and sending live GPS location to Rahul & Campus Security Desk...
              </p>
              <button
                onClick={() => setEmergencyActive(false)}
                className="w-full py-3 bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Dismiss Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
