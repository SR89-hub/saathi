import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ScreenId } from "../../types";
import { safetyApi } from "../../services/api";

interface AiChatScreenProps {
  messages: ChatMessage[];
  onAddMessage: (msg: ChatMessage) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const AiChatScreen: React.FC<AiChatScreenProps> = ({
  messages,
  onAddMessage,
  onNavigate,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "Someone is following me",
    "It's too dark here",
    "Find nearest open store",
    "Share location with Rahul",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };
    onAddMessage(userMsg);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiReply = await safetyApi.sendAiMessage(text, messages);
      onAddMessage(aiReply);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleMic = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleSend("I notice a suspicious vehicle driving slowly beside me.");
      }, 2500);
    }
  };

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
          <div className="w-8 h-8 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center text-sm shadow-xs">
            <i className="fa-solid fa-brain"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-slate-900">SAATHI AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Safety Intelligence Online</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("4")}
          className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100"
        >
          View Assessment
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] shadow-xs leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-teal-800 text-white rounded-tr-none"
                  : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "saathi" && (
              <span className="text-[9px] text-slate-400 mt-1 pl-1">
                SAATHI Co-Pilot • AI Verified
              </span>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-2xl w-20 rounded-tl-none">
            <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        {/* Action Buttons for rapid navigation */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onNavigate("4")}
            className="bg-teal-800 hover:bg-teal-900 active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Safety Assessment</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
          <button
            onClick={() => onNavigate("5")}
            className="bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-map-location-dot text-teal-700"></i>
            <span>Show Safe Spots</span>
          </button>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 pt-1 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[11px] whitespace-nowrap bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full hover:border-teal-400 hover:text-teal-800 transition-colors shadow-2xs font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="p-3 bg-white border-t border-slate-200">
        {isListening && (
          <div className="mb-2 p-2 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900 animate-pulse">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-wave-square text-teal-700"></i>
              Listening to your voice... Speak naturally.
            </span>
            <button
              onClick={() => setIsListening(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMic}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
              isListening
                ? "bg-red-500 text-white animate-ping"
                : "bg-slate-100 text-slate-600 hover:text-teal-800 hover:bg-teal-50"
            }`}
            title="Speak into microphone"
          >
            <i className="fa-solid fa-microphone"></i>
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type anything or tap mic..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs shadow-sm transition-all ${
              inputValue.trim()
                ? "bg-teal-800 hover:bg-teal-900 cursor-pointer active:scale-95"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
