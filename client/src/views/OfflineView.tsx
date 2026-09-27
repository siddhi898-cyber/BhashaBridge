import React, { useState } from 'react';
import { WifiOff, Database, CheckCircle2, HardDrive, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { LanguageData } from '../data/languages';
import { soundService } from '../services/soundService';

interface OfflineViewProps {
  currentLanguage: LanguageData;
  isOffline: boolean;
  onToggleOffline: () => void;
}

export const OfflineView: React.FC<OfflineViewProps> = ({ currentLanguage, isOffline, onToggleOffline }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Today, 11:42 AM');

  const handleManualSync = () => {
    soundService.playTapSound();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      soundService.playStampSound();
    }, 1200);
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* Offline Status Hero Card */}
      <div className={`p-4 rounded-2xl border shadow-sm transition-all ${
        isOffline 
          ? 'bg-[#192033] text-white border-[#192033]' 
          : 'bg-white text-[#192033] border-[#E5D9C5]'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isOffline ? 'bg-amber-500/20 text-[#E9A23B]' : 'bg-green-100 text-green-700'}`}>
              <WifiOff size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold">
                {isOffline ? 'Offline Mode Active' : 'Online Connected (Mesh Ready)'}
              </h3>
              <p className={`text-[10px] ${isOffline ? 'text-gray-300' : 'text-[#616B82]'}`}>
                SIH 2026 PS#26042 Zero-Connectivity Architecture
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playTapSound();
              onToggleOffline();
            }}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
              isOffline
                ? 'bg-[#E9A23B] text-[#192033] border-[#E9A23B]'
                : 'bg-[#FBF8F3] text-[#192033] border-[#E5D9C5] hover:border-[#192033]'
            }`}
          >
            {isOffline ? 'Switch to Online' : 'Simulate Offline'}
          </button>
        </div>

        <p className={`text-[11px] leading-relaxed mt-2 ${isOffline ? 'text-gray-300' : 'text-[#57617A]'}`}>
          {isOffline
            ? 'All lessons, dialect audio packs, and quizzes are running directly from local device storage (IndexedDB/SQLite). Zero internet required.'
            : 'Device automatically checks for lesson package updates and syncs completed student quiz logs in background.'}
        </p>
      </div>

      {/* Offline Cache Stats */}
      <div className="p-3.5 bg-white rounded-2xl border border-[#E5D9C5] shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-[#192033] uppercase tracking-wider flex items-center justify-between">
          <span>Local Device Storage (PWA/IndexedDB)</span>
          <span className="text-[9px] text-[#15803D] font-mono">100% Cached</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8DFC9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-[#E9A23B]" />
              <div>
                <div className="font-bold text-[#192033] text-[11px]">Rural Dialect Audio Pack</div>
                <div className="text-[9px] text-[#616B82]">12 Indian regional dialect speech engines</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#15803D]">14.2 MB</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8DFC9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive size={14} className="text-[#2563EB]" />
              <div>
                <div className="font-bold text-[#192033] text-[11px]">Interactive Roti Math Lessons</div>
                <div className="text-[9px] text-[#616B82]">Fraction models, visual SVG assets & quizzes</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#15803D]">6.8 MB</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8DFC9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#D97706]" />
              <div>
                <div className="font-bold text-[#192033] text-[11px]">Data Saved for Rural Families</div>
                <div className="text-[9px] text-[#616B82]">Compresses lessons by 94% using local speech synthesis</div>
              </div>
            </div>
            <span className="stamp-badge text-[9px]">94% Saved</span>
          </div>
        </div>

        {/* Sync Trigger */}
        <div className="pt-2 border-t border-[#E5D9C5] flex items-center justify-between">
          <span className="text-[10px] text-[#616B82]">Last Sync: {lastSyncTime}</span>
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 bg-[#192033] text-white rounded-lg hover:bg-[#2B3550] transition-all"
          >
            <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Offline Pack'}</span>
          </button>
        </div>
      </div>

      {/* Security & Reliability Badge */}
      <div className="p-3 bg-[#FAF8F3] rounded-2xl border border-[#E8DFC9] flex items-center gap-2 text-[10px] text-[#57617A]">
        <ShieldCheck size={16} className="text-[#15803D] shrink-0" />
        <span>
          Meets Smart India Hackathon standards: resilient to power cuts and 2G rural network drops.
        </span>
      </div>
    </div>
  );
};
