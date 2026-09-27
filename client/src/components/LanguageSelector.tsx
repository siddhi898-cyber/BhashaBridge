import React from 'react';
import { Check, Volume2, X, Globe2 } from 'lucide-react';
import { LANGUAGES, LANGUAGE_KEYS, LanguageData } from '../data/languages';
import { soundService } from '../services/soundService';

interface LanguageSelectorProps {
  currentLangCode: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (code: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLangCode,
  isOpen,
  onClose,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const handleSelect = (code: string) => {
    soundService.playTapSound();
    onSelectLanguage(code);
    const lang = LANGUAGES[code];
    if (lang) {
      soundService.speak(lang.audioGreeting, lang.bcp47);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#1E2337]/15 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-[#192033] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#E9A23B]/20 text-[#E9A23B]">
              <Globe2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold">अपनी भाषा चुनें • Select Language</h3>
              <p className="text-[10px] text-gray-300">12 Major Indian Languages Supported</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-3 overflow-y-auto grid grid-cols-2 gap-2 bg-[#FBF8F3]">
          {LANGUAGE_KEYS.map((key) => {
            const lang = LANGUAGES[key];
            const isSelected = key === currentLangCode;

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#192033] text-white border-[#192033] shadow-sm scale-101'
                    : 'bg-white text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B] hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#E9A23B] text-[#192033] flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-gray-300' : 'text-[#616B82]'}`}>
                    {lang.name}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[9px]">
                  <span className={`px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/15 text-white' : 'bg-[#FAF6EF] text-[#78350F]'}`}>
                    {lang.dialects.length} Dialect{lang.dialects.length > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-0.5 text-[#E9A23B] font-medium">
                    <Volume2 size={10} /> Voice
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F3ECE1] border-t border-[#E5D9C5] text-center text-[10px] text-[#616B82]">
          Every language includes native script, voice pronunciation, and dialect transcreation.
        </div>
      </div>
    </div>
  );
};
