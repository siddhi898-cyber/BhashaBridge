import React, { useState, useEffect } from 'react';
import { 
  Wifi, WifiOff, Battery, Volume2, Globe, Bot, 
  BookOpen, Sparkles 
} from 'lucide-react';
import { LanguageData } from '../data/languages';
import { BhashaBuddy } from './BhashaBuddy';
import { soundService } from '../services/soundService';

interface PhoneFrameProps {
  currentLanguage: LanguageData;
  activeRole: 'teacher' | 'student' | 'parent' | 'offline';
  onRoleChange: (role: 'teacher' | 'student' | 'parent' | 'offline') => void;
  onOpenLanguageModal: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  currentLanguage,
  activeRole,
  onRoleChange,
  onOpenLanguageModal,
  isOffline,
  onToggleOffline,
  children,
}) => {
  const [isBuddyOpen, setIsBuddyOpen] = useState(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState('10:42');

  useEffect(() => {
    const unsub = soundService.subscribe((speaking) => {
      setIsSpeakingAudio(speaking);
    });

    const updateClock = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[780px] bg-[#1E2337] rounded-[48px] p-3 shadow-2xl border-4 border-[#2D334D] flex flex-col select-none ring-1 ring-black/30">
      {/* Phone Camera Notch & Speaker Grill */}
      <div className="absolute top-4 inset-x-0 mx-auto w-24 h-4 bg-black rounded-full z-50 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A24] border border-gray-800"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-950/40 ml-2"></div>
      </div>

      {/* Screen Body */}
      <div className="relative w-full h-full bg-[#F4EFE6] rounded-[38px] overflow-hidden flex flex-col border border-black/10">
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-[#192033] bg-[#F4EFE6] z-30">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5 text-xs">
            {isOffline ? (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-[#C2410C] bg-[#FFEDD5] px-1.5 py-0.2 rounded-full">
                <WifiOff size={10} /> Offline
              </span>
            ) : (
              <div className="flex items-center gap-0.5 text-gray-700">
                <span className="text-[9px] font-bold text-gray-500 mr-0.5">4G</span>
                <Wifi size={12} />
              </div>
            )}
            <div className="flex items-center gap-0.5">
              <span className="text-[9px]">98%</span>
              <Battery size={13} className="fill-current text-[#192033]" />
            </div>
          </div>
        </div>

        {/* In-App Navigation Header */}
        <div className="px-3.5 py-2 bg-[#F4EFE6] border-b border-[#E2D7C4] flex items-center justify-between z-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-1.5">
            {/* Custom Open-book Brandmark from ideas.md */}
            <div className="w-7 h-7 rounded-lg bg-[#192033] flex items-center justify-center text-white relative shadow-xs">
              <BookOpen size={15} className="text-[#FBF8F3]" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E9A23B]"></div>
            </div>
            <div>
              <h1 className="text-xs font-bold text-[#192033] tracking-tight leading-none font-editorial">
                BhashaBridge
              </h1>
              <span className="text-[8.5px] text-[#616B82] leading-none block mt-0.5 font-sans">
                PS#26042 Rural Ed
              </span>
            </div>
          </div>

          {/* Language Switch Button & Live Audio Indicator */}
          <div className="flex items-center gap-1.5">
            {isSpeakingAudio && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#E9A23B]/20 text-[#D97706] text-[9px] font-bold animate-pulse">
                <Volume2 size={11} />
                <span>Voice</span>
              </div>
            )}

            <button
              onClick={() => {
                soundService.playTapSound();
                onOpenLanguageModal();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-[#E5D9C5] text-[#192033] text-[10px] font-bold shadow-2xs hover:border-[#E9A23B] transition-all"
            >
              <Globe size={11} className="text-[#E9A23B]" />
              <span>{currentLanguage.nativeName}</span>
            </button>
          </div>
        </div>

        {/* Role Tab Navigation Rail */}
        <div className="px-2.5 py-1.5 bg-[#FAF6EF] border-b border-[#E8DFC9] flex gap-1 z-20 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              soundService.playTapSound();
              onRoleChange('teacher');
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold transition-all text-center truncate ${
              activeRole === 'teacher'
                ? 'bg-[#192033] text-white shadow-xs'
                : 'text-[#616B82] hover:bg-white/60 hover:text-[#192033]'
            }`}
          >
            {currentLanguage.roles.teacher.split(' ')[0]}
          </button>

          <button
            onClick={() => {
              soundService.playTapSound();
              onRoleChange('student');
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold transition-all text-center truncate ${
              activeRole === 'student'
                ? 'bg-[#192033] text-white shadow-xs'
                : 'text-[#616B82] hover:bg-white/60 hover:text-[#192033]'
            }`}
          >
            {currentLanguage.roles.student.split(' ')[0]}
          </button>

          <button
            onClick={() => {
              soundService.playTapSound();
              onRoleChange('parent');
            }}
            className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold transition-all text-center truncate ${
              activeRole === 'parent'
                ? 'bg-[#192033] text-white shadow-xs'
                : 'text-[#616B82] hover:bg-white/60 hover:text-[#192033]'
            }`}
          >
            {currentLanguage.roles.parent.split(' ')[0]}
          </button>

          <button
            onClick={() => {
              soundService.playTapSound();
              onRoleChange('offline');
            }}
            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold transition-all text-center flex items-center gap-1 ${
              activeRole === 'offline'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'text-[#C2410C] bg-[#FFEDD5]/60 hover:bg-[#FFEDD5]'
            }`}
          >
            <WifiOff size={10} />
            <span>Sync</span>
          </button>
        </div>

        {/* Phone Content Scroll View */}
        <div className="flex-1 overflow-y-auto p-3.5 relative notebook-pattern">
          {children}
        </div>

        {/* IN-PHONE BHASHA BUDDY FLOATING TRIGGER (per todo.md) */}
        <div className="absolute right-3.5 bottom-7 z-40">
          <button
            onClick={() => {
              soundService.playTapSound();
              setIsBuddyOpen(!isBuddyOpen);
            }}
            className="w-11 h-11 rounded-full bg-[#192033] text-[#E9A23B] border-2 border-[#E9A23B] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
            title="Open In-Phone Bhasha Buddy AI Chatbot"
          >
            <Bot size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Embedded In-Phone Bhasha Buddy Chatbot */}
        <BhashaBuddy
          currentLanguage={currentLanguage}
          isOpen={isBuddyOpen}
          onClose={() => setIsBuddyOpen(false)}
        />

        {/* Phone Bottom Gesture Pill */}
        <div className="h-5 bg-[#F4EFE6] flex items-center justify-center z-30">
          <div className="w-32 h-1 bg-black/25 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
