import React, { useState } from 'react';
import { 
  BookOpen, Globe, Volume2, Sparkles, WifiOff, Wifi, 
  HelpCircle, Shield, Award, Play 
} from 'lucide-react';
import { LANGUAGES, LANGUAGE_KEYS, LanguageData } from './data/languages';
import { PhoneFrame } from './components/PhoneFrame';
import { TeacherView } from './views/TeacherView';
import { StudentView } from './views/StudentView';
import { ParentView } from './views/ParentView';
import { OfflineView } from './views/OfflineView';
import { LanguageSelector } from './components/LanguageSelector';
import { PresentationGuide } from './components/PresentationGuide';
import { soundService } from './services/soundService';

export default function App() {
  const [currentLangCode, setCurrentLangCode] = useState<string>('hi');
  const [activeRole, setActiveRole] = useState<'teacher' | 'student' | 'parent' | 'offline'>('student');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);

  const currentLanguage: LanguageData = LANGUAGES[currentLangCode] || LANGUAGES['hi'];

  const handleSelectLanguage = (code: string) => {
    setCurrentLangCode(code);
    const lang = LANGUAGES[code];
    if (lang) {
      soundService.speak(lang.audioGreeting, lang.bcp47);
    }
  };

  const handleToggleOffline = () => {
    setIsOffline((prev) => !prev);
    soundService.playStampSound();
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#192033] flex flex-col font-sans">
      {/* Top Banner / SIH Hackathon Header */}
      <header className="bg-[#192033] text-white border-b-2 border-[#E9A23B]/50 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Meta */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9A23B] text-[#192033] flex items-center justify-center font-bold shadow-md">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight font-editorial">
                  BhashaBridge (भाषाब्रिज)
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9A23B]/20 text-[#E9A23B] border border-[#E9A23B]/40 font-mono">
                  SIH 2026 • PS#26042
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Multilingual Rural Education & Dialect-Aware AI Transcreation
              </p>
            </div>
          </div>

          {/* Quick Action Badges & Universal Language Picker */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Quick Language Trigger */}
            <button
              onClick={() => {
                soundService.playTapSound();
                setIsLangModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all"
            >
              <Globe size={14} className="text-[#E9A23B]" />
              <span>{currentLanguage.nativeName} ({currentLanguage.name})</span>
            </button>

            {/* Offline Simulation Toggle */}
            <button
              onClick={handleToggleOffline}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isOffline
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-white/10 text-gray-200 border-white/15 hover:bg-white/20'
              }`}
            >
              {isOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
              <span>{isOffline ? 'Offline Mode' : 'Online Sync'}</span>
            </button>
          </div>
        </div>

        {/* 12-Language Quick Switcher Ribbon */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
            Test Language:
          </span>
          {LANGUAGE_KEYS.map((code) => {
            const lang = LANGUAGES[code];
            const isSelected = code === currentLangCode;
            return (
              <button
                key={code}
                onClick={() => handleSelectLanguage(code)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#E9A23B] text-[#192033] font-bold shadow-xs'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{lang.nativeName}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: SIH Presentation Companion & 90-Second Journey Guide */}
          <div className="lg:col-span-7 space-y-4">
            <PresentationGuide
              activeRole={activeRole}
              onSelectRole={setActiveRole}
              onSelectLanguage={handleSelectLanguage}
            />

            {/* Quick Demonstration Cards for PPT Screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => {
                  soundService.playTapSound();
                  setActiveRole('teacher');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  activeRole === 'teacher'
                    ? 'bg-[#192033] text-white border-[#192033] shadow-md'
                    : 'bg-white text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E9A23B]">Role 1</div>
                <h4 className="text-xs font-bold mt-1">Teacher Dashboard</h4>
                <p className={`text-[10px] mt-1 leading-relaxed ${activeRole === 'teacher' ? 'text-gray-300' : 'text-[#616B82]'}`}>
                  Dialect transcreation engine with regional voice output & 4 live sync metrics.
                </p>
              </div>

              <div
                onClick={() => {
                  soundService.playTapSound();
                  setActiveRole('student');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  activeRole === 'student'
                    ? 'bg-[#192033] text-white border-[#192033] shadow-md'
                    : 'bg-white text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E9A23B]">Role 2</div>
                <h4 className="text-xs font-bold mt-1">Student Journey</h4>
                <p className={`text-[10px] mt-1 leading-relaxed ${activeRole === 'student' ? 'text-gray-300' : 'text-[#616B82]'}`}>
                  Tactile roti fractions (1/4, 1/2, 3/4), spoken syllables, and interactive quiz.
                </p>
              </div>

              <div
                onClick={() => {
                  soundService.playTapSound();
                  setActiveRole('parent');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  activeRole === 'parent'
                    ? 'bg-[#192033] text-white border-[#192033] shadow-md'
                    : 'bg-white text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E9A23B]">Role 3</div>
                <h4 className="text-xs font-bold mt-1">Parent Audio Card</h4>
                <p className={`text-[10px] mt-1 leading-relaxed ${activeRole === 'parent' ? 'text-gray-300' : 'text-[#616B82]'}`}>
                  Spoken audio summaries for low-literacy families & two-way voice messaging.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Prototype */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full text-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#616B82] bg-white/70 px-3 py-1 rounded-full border border-[#E5D9C5] shadow-2xs">
                📱 Live Interactive Phone Prototype
              </span>
            </div>

            <PhoneFrame
              currentLanguage={currentLanguage}
              activeRole={activeRole}
              onRoleChange={setActiveRole}
              onOpenLanguageModal={() => setIsLangModalOpen(true)}
              isOffline={isOffline}
              onToggleOffline={handleToggleOffline}
            >
              {activeRole === 'teacher' && <TeacherView currentLanguage={currentLanguage} />}
              {activeRole === 'student' && <StudentView currentLanguage={currentLanguage} />}
              {activeRole === 'parent' && <ParentView currentLanguage={currentLanguage} />}
              {activeRole === 'offline' && (
                <OfflineView
                  currentLanguage={currentLanguage}
                  isOffline={isOffline}
                  onToggleOffline={handleToggleOffline}
                />
              )}
            </PhoneFrame>
          </div>
        </div>
      </main>

      {/* Language Selection Modal */}
      <LanguageSelector
        currentLangCode={currentLangCode}
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Footer */}
      <footer className="bg-[#EFE8DC] border-t border-[#E2D7C4] py-4 px-6 text-center text-xs text-[#616B82]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Smart India Hackathon 2026 Prototype • Problem Statement #26042</span>
          <span className="font-semibold text-[#192033]">BhashaBridge: Bridging Rural Education Through Dialect AI</span>
        </div>
      </footer>
    </div>
  );
}
