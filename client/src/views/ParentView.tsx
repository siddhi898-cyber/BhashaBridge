import React, { useState } from 'react';
import { Volume2, Mic, CheckCircle2, User, Calendar, Award, Send, Play, Pause, Sparkles } from 'lucide-react';
import { LanguageData } from '../data/languages';
import { soundService } from '../services/soundService';

interface ParentViewProps {
  currentLanguage: LanguageData;
}

export const ParentView: React.FC<ParentViewProps> = ({ currentLanguage }) => {
  const [isPlayingSummary, setIsPlayingSummary] = useState(false);
  const [isRecordingReply, setIsRecordingReply] = useState(false);
  const [recordedAudioReady, setRecordedAudioReady] = useState(false);
  const [replySentSuccess, setReplySentSuccess] = useState(false);

  const parentData = currentLanguage.parentCard;

  const handleToggleSummaryAudio = () => {
    soundService.playTapSound();
    if (isPlayingSummary) {
      soundService.stop();
      setIsPlayingSummary(false);
    } else {
      setIsPlayingSummary(true);
      soundService.speak(parentData.summaryAudioText, currentLanguage.bcp47, () => {
        setIsPlayingSummary(false);
      });
    }
  };

  const handleRecordVoiceNote = () => {
    soundService.playTapSound();
    setIsRecordingReply(true);
    setRecordedAudioReady(false);
    setReplySentSuccess(false);

    // Simulate voice recording duration
    setTimeout(() => {
      setIsRecordingReply(false);
      setRecordedAudioReady(true);
      soundService.playStampSound();
    }, 2000);
  };

  const handleSendVoiceReply = () => {
    soundService.playStampSound();
    setReplySentSuccess(true);
    setRecordedAudioReady(false);
    setTimeout(() => setReplySentSuccess(false), 4000);
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* Top Banner / Parent Context */}
      <div className="p-3 bg-white rounded-2xl border border-[#E5D9C5] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#E9A23B]/20 text-[#B45309] flex items-center justify-center font-bold">
            <User size={18} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#192033]">{parentData.childName}</h2>
            <div className="flex items-center gap-1.5 text-[9px] text-[#616B82]">
              <Calendar size={10} />
              <span>{parentData.date}</span>
            </div>
          </div>
        </div>
        <div className="stamp-badge-green text-[9px]">
          {parentData.attendanceValue}
        </div>
      </div>

      {/* Main Spoken Audio Player Card for Low-Literacy Accessibility */}
      <div className="p-4 rounded-2xl bg-[#192033] text-white shadow-md relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#E9A23B]/10 rounded-full pointer-events-none"></div>

        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#E9A23B] font-bold block mb-0.5">
              Spoken Daily Voice Report
            </span>
            <h3 className="text-xs font-bold text-white pr-4">
              {parentData.listenSpokenSummary}
            </h3>
          </div>
          <div className="p-1 rounded-full bg-white/10 text-[#E9A23B]">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Audio Waveform & Big Play Button */}
        <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
          <button
            onClick={handleToggleSummaryAudio}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ${
              isPlayingSummary
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-[#E9A23B] text-[#192033] hover:scale-105 hover:bg-[#F59E0B]'
            }`}
          >
            {isPlayingSummary ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-1 h-7">
              {isPlayingSummary ? (
                <>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                  <div className="w-1 bg-[#E9A23B] soundwave-bar rounded-full"></div>
                </>
              ) : (
                <div className="text-[10px] text-gray-300">
                  Tap orange button to listen in <span className="text-[#E9A23B] font-bold">{currentLanguage.nativeName}</span>
                </div>
              )}
            </div>
            <span className="text-[9px] text-gray-400 block mt-0.5">
              Dialect-aware audio • Offline accessible
            </span>
          </div>
        </div>

        <p className="text-[11px] text-gray-300 mt-3 leading-relaxed border-t border-white/10 pt-2.5 italic">
          "{parentData.summaryAudioText}"
        </p>
      </div>

      {/* Concept Mastered Badge Card */}
      <div className="p-3 bg-white rounded-2xl border border-[#E5D9C5] shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#15803D]/10 text-[#15803D]">
            <Award size={15} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#616B82] font-bold">
              {parentData.masteredSkill}
            </span>
            <div className="text-xs font-bold text-[#192033]">{parentData.skillValue}</div>
          </div>
        </div>
      </div>

      {/* Teacher's Note with Spoken Audio */}
      <div className="p-3.5 bg-[#FAF8F3] rounded-2xl border border-[#E5D9C5] space-y-2 relative">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#192033] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9A23B]"></span>
            {parentData.teacherNoteTitle}
          </h4>
          <button
            onClick={() => {
              soundService.playTapSound();
              soundService.speak(parentData.teacherNote, currentLanguage.bcp47);
            }}
            className="flex items-center gap-1 text-[10px] font-bold text-[#E9A23B] hover:underline"
          >
            <Volume2 size={12} />
            <span>Listen</span>
          </button>
        </div>
        <p className="text-[11px] text-[#57617A] leading-relaxed bg-white p-2.5 rounded-xl border border-[#E8DFC9]">
          "{parentData.teacherNote}"
        </p>
      </div>

      {/* Parent Voice Reply to Teacher (Two-way rural communication) */}
      <div className="p-3.5 bg-white rounded-2xl border border-[#E5D9C5] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#192033]">
              Ask Teacher a Doubt in Mother Tongue
            </h4>
            <p className="text-[10px] text-[#616B82]">
              Parents can speak questions; audio delivers straight to teacher
            </p>
          </div>
        </div>

        {!recordedAudioReady && !replySentSuccess && (
          <button
            onClick={handleRecordVoiceNote}
            disabled={isRecordingReply}
            className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-xs ${
              isRecordingReply
                ? 'bg-red-500 text-white border-red-500 animate-pulse'
                : 'bg-[#FBF8F3] border-[#E5D9C5] text-[#192033] hover:border-[#E9A23B]'
            }`}
          >
            <Mic size={14} className={isRecordingReply ? 'animate-bounce' : 'text-[#E9A23B]'} />
            <span>{isRecordingReply ? 'Recording Voice Note in ' + currentLanguage.nativeName + '...' : parentData.voiceReplyBtn}</span>
          </button>
        )}

        {recordedAudioReady && (
          <div className="p-2.5 bg-[#FEF3C7]/40 border border-[#FDE68A] rounded-xl space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-[11px] text-[#192033] font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#15803D]" />
                Voice Note Recorded (0:04)
              </span>
              <button
                onClick={() => soundService.speak('हाँ गुरुजी, आरव आज शाम को रोटी बाँटकर अभ्यास करेगा। धन्यवाद।', currentLanguage.bcp47)}
                className="text-[10px] text-[#B45309] font-bold flex items-center gap-1"
              >
                <Play size={10} /> Preview
              </button>
            </div>
            <button
              onClick={handleSendVoiceReply}
              className="w-full py-1.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <Send size={11} />
              <span>Send Voice Note to Teacher</span>
            </button>
          </div>
        )}

        {replySentSuccess && (
          <div className="p-2.5 bg-[#DCFCE7] border border-[#86EFAC] rounded-xl text-center text-[11px] font-bold text-[#15803D] animate-in fade-in duration-200">
            ✓ {parentData.voiceReplySent}
          </div>
        )}
      </div>
    </div>
  );
};
