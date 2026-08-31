import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScreenId,
  ChatMessage,
  SafePlace,
  IncidentReport,
  UserProfile,
} from "./types";
import {
  mockUserProfile,
  mockSafePlaces,
  mockCommunityReports,
} from "./services/api";

import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { AiChatScreen } from "./components/screens/AiChatScreen";
import { SafetyAssessmentScreen } from "./components/screens/SafetyAssessmentScreen";
import { SafePlacesScreen } from "./components/screens/SafePlacesScreen";
import { NavigationScreen } from "./components/screens/NavigationScreen";
import { TrustedContactScreen } from "./components/screens/TrustedContactScreen";
import { TimelineScreen } from "./components/screens/TimelineScreen";
import { CommunityScreen } from "./components/screens/CommunityScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { SosModal } from "./components/SosModal";
import { ReportModal } from "./components/ReportModal";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("1");
  const [currentTime, setCurrentTime] = useState("09:41");
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"mobile" | "expanded">("mobile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [places, setPlaces] = useState<SafePlace[]>(mockSafePlaces);
  const [selectedPlace, setSelectedPlace] = useState<SafePlace>(mockSafePlaces[0]);
  const [reports, setReports] = useState<IncidentReport[]>(mockCommunityReports);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "saathi",
      text: "Hi Aditi, I'm SAATHI. How are you feeling right now?",
    },
    {
      sender: "user",
      text: "Someone has been following me since the last turn.",
    },
    {
      sender: "saathi",
      text: "I understand. You don't need to explain more. I can help you find a verified safe location nearby.\n\nWould you like me to show you the options?",
    },
  ]);

  // Live status clock
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  const handleReportCreated = (newReport: IncidentReport) => {
    setReports((prev) => [newReport, ...prev]);
    showToast("✓ Hazard report published to local community!");
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case "1":
        return (
          <OnboardingScreen
            onNavigate={setCurrentScreen}
            onEmergency={() => setIsSosOpen(true)}
          />
        );
      case "2":
        return (
          <HomeScreen
            user={user}
            onNavigate={setCurrentScreen}
            onEmergency={() => setIsSosOpen(true)}
          />
        );
      case "3":
        return (
          <AiChatScreen
            messages={chatMessages}
            onAddMessage={handleAddMessage}
            onNavigate={setCurrentScreen}
          />
        );
      case "4":
        return (
          <SafetyAssessmentScreen
            onNavigate={setCurrentScreen}
            onEmergency={() => setIsSosOpen(true)}
          />
        );
      case "5":
        return (
          <SafePlacesScreen
            places={places}
            onSelectPlace={setSelectedPlace}
            onNavigate={setCurrentScreen}
          />
        );
      case "6":
        return (
          <NavigationScreen
            place={selectedPlace}
            onNavigate={setCurrentScreen}
            onShareLocation={() => {
              showToast(`Live GPS route shared with ${user.primaryContact.name}`);
              setCurrentScreen("7");
            }}
          />
        );
      case "7":
        return (
          <TrustedContactScreen
            contact={user.primaryContact}
            onNavigate={setCurrentScreen}
            onSessionStarted={() =>
              showToast(`Live tracking link SMS dispatched to ${user.primaryContact.phone}`)
            }
          />
        );
      case "8":
        return <TimelineScreen onNavigate={setCurrentScreen} />;
      case "9":
        return (
          <CommunityScreen
            reports={reports}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onNavigate={setCurrentScreen}
          />
        );
      case "10":
        return (
          <ProfileScreen
            user={user}
            onNavigate={setCurrentScreen}
            onLogout={() => {
              setCurrentScreen("1");
              showToast("Session reset to onboarding.");
            }}
          />
        );
      default:
        return <HomeScreen user={user} onNavigate={setCurrentScreen} onEmergency={() => setIsSosOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Controls Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-2 px-4 mb-3 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-800 text-teal-100 flex items-center justify-center text-xs font-black shadow-sm">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div>
            <h1 className="text-xs font-black tracking-widest uppercase text-slate-200">
              SAATHI Safety Co-Pilot
            </h1>
            <span className="text-[10px] text-teal-400 font-medium">
              Frontend UI Suite • Full Stack Ready
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex text-xs">
            <button
              onClick={() => setViewMode("mobile")}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "mobile"
                  ? "bg-teal-800 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <i className="fa-solid fa-mobile-screen"></i>
              <span className="hidden sm:inline">Mobile Frame</span>
            </button>
            <button
              onClick={() => setViewMode("expanded")}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "expanded"
                  ? "bg-teal-800 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <i className="fa-solid fa-desktop"></i>
              <span className="hidden sm:inline">Overview & Endpoints</span>
            </button>
          </div>

          <button
            onClick={() => setIsSosOpen(true)}
            className="bg-red-600/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <i className="fa-solid fa-tower-broadcast animate-pulse"></i>
            <span>SOS</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
        {/* Device Frame */}
        <div
          className={`w-full max-w-[375px] h-[740px] bg-slate-50 rounded-[44px] shadow-2xl overflow-hidden flex flex-col border-[10px] border-slate-900 ring-1 ring-slate-800 relative transition-all duration-300 ${
            viewMode === "expanded" ? "scale-95" : "scale-100"
          }`}
        >
          {/* Mobile Hardware Notch & Status bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold text-slate-800 bg-transparent z-30 absolute w-full pointer-events-none">
            <span className="text-[11px] font-bold tracking-tight">{currentTime}</span>
            {/* Dynamic Island / Speaker */}
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1 shadow-xs"></div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-700">
              <i className="fa-solid fa-signal"></i>
              <i className="fa-solid fa-wifi"></i>
              <i className="fa-solid fa-battery-full text-xs text-emerald-600"></i>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="flex-1 h-full w-full flex flex-col"
              >
                {renderActiveScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Expanded Backend & API Reference Panel */}
        {viewMode === "expanded" && (
          <div className="flex-1 w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-5 text-xs text-slate-300 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                <h3 className="font-extrabold text-sm text-slate-100">
                  Backend API & Schema Contract
                </h3>
              </div>
              <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800 font-mono">
                Express + MongoDB
              </span>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-teal-300 font-bold">
                  <span>POST /api/ai/chat</span>
                  <span className="text-[9px] text-slate-500 font-sans">Google Gemini SDK</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">
                  Streams contextual danger analysis and returns safety advice.
                </p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span>GET /api/places/nearby</span>
                  <span className="text-[9px] text-slate-500 font-sans">GeoJSON Query</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">
                  Returns verified 24/7 pharmacies, police posts, and illuminated safe spots.
                </p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-red-300 font-bold">
                  <span>POST /api/sos/trigger</span>
                  <span className="text-[9px] text-slate-500 font-sans">High Priority</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">
                  Broadcasts GPS location, logs incident, and triggers SMS to emergency contacts.
                </p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>POST /api/reports</span>
                  <span className="text-[9px] text-slate-500 font-sans">Crowdsourced</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans">
                  Allows users to log broken lighting, isolated stretches, and path hazards.
                </p>
              </div>
            </div>

            <div className="p-3 bg-teal-950/50 border border-teal-800/60 rounded-2xl text-[11px] text-teal-200">
              <i className="fa-solid fa-circle-check text-teal-400 mr-1.5"></i>
              Frontend is completely decoupled and connects directly to <code>src/services/api.ts</code>.
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 z-50 bg-slate-900/95 border border-teal-500/60 text-teal-200 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2"
          >
            <i className="fa-solid fa-bell text-teal-400"></i>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Modal Dialog */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        onAlertSent={() => showToast("🚨 Emergency SOS dispatched with GPS coordinates!")}
      />

      {/* Community Hazard Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportCreated={handleReportCreated}
      />
    </div>
  );
}
