import React, { useState } from 'react';
import { 
  Users, Wifi, BookOpen, Sparkles, Volume2, ArrowRight, 
  CheckCircle2, RefreshCw, Send, Layers, Mic
} from 'lucide-react';
import { LanguageData, TranscreationPreset } from '../data/languages';
import { soundService } from '../services/soundService';

interface TeacherViewProps {
  currentLanguage: LanguageData;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ currentLanguage }) => {
  const [selectedDialectId, setSelectedDialectId] = useState(
    currentLanguage.dialects[0]?.id || 'standard'
  );
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isTranscreating, setIsTranscreating] = useState(false);
  const [activeOutput, setActiveOutput] = useState<TranscreationPreset | null>(
    currentLanguage.teacherDashboard.presets[0] || null
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  const selectedDialect = currentLanguage.dialects.find((d) => d.id === selectedDialectId) || currentLanguage.dialects[0];
  const activePreset = currentLanguage.teacherDashboard.presets[selectedPresetIndex] || currentLanguage.teacherDashboard.presets[0];

  const handleTranscreate = () => {
    soundService.playTapSound();
    setIsTranscreating(true);
    setBroadcastSent(false);

    setTimeout(() => {
      setIsTranscreating(false);
      if (customInput.trim()) {
        setActiveOutput({
          title: 'Custom Lesson Concept',
          category: 'Curriculum',
          standardSource: customInput,
          dialectResult: `${selectedDialect ? selectedDialect.nativeName : 'बोली'}: ${customInput} (Vernacular transcreation with village metaphors applied).`,
          audioPrompt: `Listening in ${selectedDialect?.name || 'Local dialect'}: ${customInput}`,
          culturalMetaphor: 'Local household and village community context',
          glossary: [{ standard: 'Concept', dialect: 'स्थानीय शब्द', meaning: 'Local metaphor' }]
        });
      } else {
        setActiveOutput(activePreset);
      }
      soundService.speak(
        activePreset?.audioPrompt || activePreset?.dialectResult || 'Transcreation complete.',
        currentLanguage.bcp47
      );
    }, 600);
  };

  const handleBroadcast = () => {
    soundService.playStampSound();
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3500);
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* 4 Metric Badges */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-[#192033] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
            {currentLanguage.teacherDashboard.metricsTitle}
          </h2>
          <span className="text-[10px] text-[#616B82] font-mono">Live Sync</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white border border-[#E5D9C5] shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#15803D]">
              <Users size={12} />
              <span>Comprehension</span>
            </div>
            <div className="text-base font-bold text-[#192033] mt-1">92%</div>
            <p className="text-[9px] text-[#616B82] leading-tight mt-0.5">
              {currentLanguage.teacherDashboard.metrics.comprehension}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E5D9C5] shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#2563EB]">
              <Wifi size={12} />
              <span>Offline Sync</span>
            </div>
            <div className="text-base font-bold text-[#192033] mt-1">100%</div>
            <p className="text-[9px] text-[#616B82] leading-tight mt-0.5">
              {currentLanguage.teacherDashboard.metrics.offlineSync}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E5D9C5] shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#C2410C]">
              <BookOpen size={12} />
              <span>Dialect Retention</span>
            </div>
            <div className="text-base font-bold text-[#192033] mt-1">88%</div>
            <p className="text-[9px] text-[#616B82] leading-tight mt-0.5">
              {currentLanguage.teacherDashboard.metrics.dialectRetention}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E5D9C5] shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#7C3AED]">
              <Layers size={12} />
              <span>Rural Learners</span>
            </div>
            <div className="text-base font-bold text-[#192033] mt-1">1,420</div>
            <p className="text-[9px] text-[#616B82] leading-tight mt-0.5">
              {currentLanguage.teacherDashboard.metrics.activeStudents}
            </p>
          </div>
        </div>
      </div>

      {/* Dialect-aware AI Transcreation Tool */}
      <div className="p-3.5 rounded-2xl bg-white border-2 border-[#E9A23B]/30 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-[#E9A23B]/20 text-[#D97706]">
              <Sparkles size={14} />
            </div>
            <h3 className="text-xs font-bold text-[#192033]">
              {currentLanguage.teacherDashboard.transcreationTitle}
            </h3>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 bg-[#FAF6EF] border border-[#E2D7C4] text-[#78350F] rounded-md font-mono">
            PS#26042
          </span>
        </div>
        <p className="text-[10px] text-[#616B82] leading-relaxed mb-2.5">
          {currentLanguage.teacherDashboard.transcreationSubtitle}
        </p>

        {/* Dialect Selector Tabs */}
        {currentLanguage.dialects && currentLanguage.dialects.length > 0 && (
          <div className="mb-2.5">
            <label className="text-[10px] font-bold text-[#192033] block mb-1">
              Select Target Village Dialect:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {currentLanguage.dialects.map((dialect) => (
                <button
                  key={dialect.id}
                  onClick={() => {
                    soundService.playTapSound();
                    setSelectedDialectId(dialect.id);
                  }}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    selectedDialectId === dialect.id
                      ? 'bg-[#192033] text-white border-[#192033] shadow-xs'
                      : 'bg-[#FAF8F3] text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                  }`}
                >
                  <span>{dialect.name}</span>
                  <span className="ml-1 opacity-75 font-normal">({dialect.nativeName})</span>
                </button>
              ))}
            </div>
            {selectedDialect && (
              <p className="text-[9px] text-[#D97706] mt-1 bg-[#FEF3C7]/40 px-2 py-0.5 rounded border border-[#FDE68A]/60">
                Region: {selectedDialect.region} • {selectedDialect.description}
              </p>
            )}
          </div>
        )}

        {/* Presets / Sample Topics */}
        <div className="mb-2">
          <label className="text-[10px] font-bold text-[#192033] block mb-1">
            Choose Standard Textbook Topic:
          </label>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {currentLanguage.teacherDashboard.presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundService.playTapSound();
                  setSelectedPresetIndex(idx);
                  setActiveOutput(preset);
                }}
                className={`text-[10px] px-2.5 py-1 rounded-lg border text-left shrink-0 transition-all ${
                  selectedPresetIndex === idx
                    ? 'bg-[#E9A23B]/15 border-[#E9A23B] font-bold text-[#192033]'
                    : 'bg-[#FBF8F3] border-[#E5D9C5] text-[#57617A] hover:bg-white'
                }`}
              >
                <span>{preset.title}</span>
                <span className="block text-[8px] opacity-75 font-normal">({preset.category})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Text Box */}
        <div className="mb-2.5">
          <textarea
            value={customInput || activePreset?.standardSource || ''}
            onChange={(e) => setCustomInput(e.target.value)}
            rows={2}
            placeholder={currentLanguage.teacherDashboard.inputPlaceholder}
            className="w-full text-[11px] p-2 bg-[#FBF8F3] border border-[#E5D9C5] rounded-xl text-[#192033] placeholder-gray-400 focus:outline-none focus:border-[#E9A23B] resize-none"
          />
        </div>

        {/* Transcreate Action Button */}
        <button
          onClick={handleTranscreate}
          disabled={isTranscreating}
          className="w-full py-2 px-3 bg-[#E9A23B] hover:bg-[#D78E24] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          {isTranscreating ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>Transcreating into {selectedDialect?.name || 'Dialect'}...</span>
            </>
          ) : (
            <>
              <Sparkles size={13} />
              <span>{currentLanguage.teacherDashboard.transcreateBtn}</span>
            </>
          )}
        </button>

        {/* Transcreated Result Output Card */}
        {activeOutput && (
          <div className="mt-3 p-3 bg-[#FAF8F3] border border-[#E5D9C5] rounded-xl space-y-2.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#C2410C] tracking-wide uppercase flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#15803D]" />
                Dialect Transcreation Result
              </span>
              <button
                onClick={() => {
                  soundService.playTapSound();
                  soundService.speak(activeOutput.audioPrompt || activeOutput.dialectResult, currentLanguage.bcp47);
                }}
                className="flex items-center gap-1 text-[10px] font-bold text-[#192033] bg-white border border-[#E5D9C5] px-2 py-0.5 rounded-lg shadow-2xs hover:bg-[#E9A23B] hover:text-white transition-all"
              >
                <Volume2 size={11} className="text-[#E9A23B]" />
                Listen in Voice
              </button>
            </div>

            <p className="text-[11px] text-[#192033] font-medium leading-relaxed bg-white p-2.5 rounded-lg border border-[#E8DFC9]">
              "{activeOutput.dialectResult}"
            </p>

            {/* Cultural Metaphor Badge */}
            <div className="text-[10px] text-[#57617A] bg-[#FEF3C7]/40 p-2 rounded-lg border border-[#FDE68A]/60">
              <span className="font-bold text-[#B45309]">Rural Metaphor: </span>
              {activeOutput.culturalMetaphor}
            </div>

            {/* Vocabulary Bridge */}
            {activeOutput.glossary && activeOutput.glossary.length > 0 && (
              <div>
                <span className="text-[9px] font-bold uppercase text-[#616B82] block mb-1">
                  Vernacular Vocabulary Bridge:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                  {activeOutput.glossary.map((g, i) => (
                    <div key={i} className="p-1.5 rounded-md bg-white border border-[#E8DFC9]">
                      <div className="font-semibold text-gray-500 line-through text-[8.5px]">{g.standard}</div>
                      <div className="font-bold text-[#15803D]">{g.dialect}</div>
                      <div className="text-[8px] text-gray-400">{g.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Broadcast to Students / Parents */}
            <div className="pt-1 flex items-center justify-between border-t border-[#E5D9C5]">
              <span className="text-[9px] text-[#616B82]">Classroom Action:</span>
              <button
                onClick={handleBroadcast}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 bg-[#15803D] hover:bg-[#166534] text-white rounded-lg transition-all"
              >
                <Send size={10} />
                <span>{broadcastSent ? '✓ Broadcasted to Phones!' : 'Push to Student Devices'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
