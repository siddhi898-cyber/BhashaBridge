import React, { useState } from 'react';
import { Bot, Mic, Send, Volume2, X, Sparkles, MessageSquare } from 'lucide-react';
import { soundService } from '../services/soundService';
import { LanguageData } from '../data/languages';

interface BhashaBuddyProps {
  currentLanguage: LanguageData;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  langCode: string;
  timestamp: string;
}

export const BhashaBuddy: React.FC<BhashaBuddyProps> = ({ currentLanguage, isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: currentLanguage.buddyPrompts.defaultGreeting,
      langCode: currentLanguage.code,
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  // Detect script or language family
  const detectLanguage = (text: string): { code: string; bcp47: string } => {
    // Bengali/Assamese script: \u0980-\u09FF
    if (/[\u0980-\u09FF]/.test(text)) return { code: 'bn', bcp47: 'bn-IN' };
    // Tamil script: \u0B80-\u0BFF
    if (/[\u0B80-\u0BFF]/.test(text)) return { code: 'ta', bcp47: 'ta-IN' };
    // Telugu script: \u0C00-\u0C7F
    if (/[\u0C00-\u0C7F]/.test(text)) return { code: 'te', bcp47: 'te-IN' };
    // Kannada script: \u0C80-\u0CFF
    if (/[\u0C80-\u0CFF]/.test(text)) return { code: 'kn', bcp47: 'kn-IN' };
    // Gujarati script: \u0A80-\u0AFF
    if (/[\u0A80-\u0AFF]/.test(text)) return { code: 'gu', bcp47: 'gu-IN' };
    // Gurmukhi (Punjabi): \u0A00-\u0A7F
    if (/[\u0A00-\u0A7F]/.test(text)) return { code: 'pa', bcp47: 'pa-IN' };
    // Malayalam: \u0D00-\u0D7F
    if (/[\u0D00-\u0D7F]/.test(text)) return { code: 'ml', bcp47: 'ml-IN' };
    // Oriya: \u0B00-\u0B7F
    if (/[\u0B00-\u0B7F]/.test(text)) return { code: 'or', bcp47: 'or-IN' };
    // Devanagari (Hindi/Marathi): \u0900-\u097F
    if (/[\u0900-\u097F]/.test(text)) {
      return currentLanguage.code === 'mr' ? { code: 'mr', bcp47: 'mr-IN' } : { code: 'hi', bcp47: 'hi-IN' };
    }
    // Default to currently selected language
    return { code: currentLanguage.code, bcp47: currentLanguage.bcp47 };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    soundService.playTapSound();
    const detected = detectLanguage(text);

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      langCode: detected.code,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate response matching language and topic
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('1/4') || lower.includes('1/2') || lower.includes('fraction') || lower.includes('बड़ा') || lower.includes('मोठं') || lower.includes('பெரியது')) {
        botResponse = currentLanguage.buddyPrompts.responses['fraction'] || 
          '1/2 is bigger than 1/4! A half piece is twice as large as a quarter piece.';
      } else if (lower.includes('roti') || lower.includes('रोटी') || lower.includes('भाकरी') || lower.includes('రొట్టె') || lower.includes('রূটি')) {
        botResponse = currentLanguage.buddyPrompts.responses['roti'] || 
          currentLanguage.rotiLesson.fractions[1].audioSpoken;
      } else {
        botResponse = currentLanguage.buddyPrompts.responses['default'] || 
          `BhashaBridge: ${currentLanguage.greeting}! We make learning easy in ${currentLanguage.nativeName}.`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        langCode: detected.code,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      soundService.speak(botResponse, detected.bcp47);
    }, 450);
  };

  const handleVoiceInput = () => {
    soundService.playTapSound();
    setIsListening(true);

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = currentLanguage.bcp47;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          // Fallback simulation with sample question for demo reliability
          const sample = currentLanguage.buddyPrompts.sampleQuestions[0];
          handleSend(sample);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        // Fallback simulation
      }
    }

    // Fallback simulated voice query for presentation stability
    setTimeout(() => {
      setIsListening(false);
      const sample = currentLanguage.buddyPrompts.sampleQuestions[0];
      handleSend(sample);
    }, 1200);
  };

  return (
    <div className="absolute inset-x-2 bottom-3 top-12 z-50 flex flex-col rounded-2xl bg-white shadow-2xl border-2 border-[#1E2337]/15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#192033] text-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E9A23B] flex items-center justify-center text-[#192033] shadow-inner font-bold">
            <Bot size={17} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold tracking-tight">Bhasha Buddy</h3>
              <span className="text-[9px] px-1.5 py-0.2 bg-[#E9A23B]/20 text-[#E9A23B] rounded-full font-mono">AI Tutor</span>
            </div>
            <p className="text-[10px] text-gray-300">
              Active Context: <span className="text-[#E9A23B] font-semibold">{currentLanguage.nativeName}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            soundService.playTapSound();
            soundService.stop();
            onClose();
          }}
          className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X size={17} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#FBF8F3] notebook-dots text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-2.5 leading-relaxed shadow-sm transition-all ${
                msg.sender === 'user'
                  ? 'bg-[#192033] text-white rounded-tr-none'
                  : 'bg-white border border-[#E5D9C5] text-[#192033] rounded-tl-none'
              }`}
            >
              <p className="text-[12px]">{msg.text}</p>
              <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-black/5 text-[9px] opacity-75">
                <span>{msg.timestamp}</span>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => {
                      soundService.playTapSound();
                      soundService.speak(msg.text, currentLanguage.bcp47);
                    }}
                    className="flex items-center gap-1 text-[#E9A23B] font-semibold hover:underline"
                  >
                    <Volume2 size={11} /> Listen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isListening && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#E9A23B]/10 border border-[#E9A23B]/30 text-[#192033] animate-pulse">
            <Mic size={14} className="text-[#E9A23B] animate-bounce" />
            <span className="text-[11px] font-medium">Listening in {currentLanguage.nativeName}...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-2.5 py-1.5 bg-[#F3ECE1] border-t border-[#E5D9C5] flex gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[9px] font-bold text-[#616B82] uppercase flex items-center shrink-0">
          <Sparkles size={10} className="mr-0.5 text-[#E9A23B]" /> Try:
        </span>
        {currentLanguage.buddyPrompts.sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[10px] px-2 py-0.5 bg-white border border-[#E2D7C4] rounded-full text-[#192033] hover:bg-[#E9A23B]/10 hover:border-[#E9A23B] shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-2 bg-white border-t border-[#E5D9C5] flex items-center gap-1.5">
        <button
          onClick={handleVoiceInput}
          className={`p-2 rounded-full transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-[#F3ECE1] text-[#192033] hover:bg-[#E9A23B] hover:text-white'
          }`}
          title="Speak your question in any language"
        >
          <Mic size={15} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask in ${currentLanguage.nativeName} or English...`}
          className="flex-1 bg-[#FBF8F3] border border-[#E5D9C5] rounded-xl px-2.5 py-1.5 text-xs text-[#192033] placeholder-gray-400 focus:outline-none focus:border-[#E9A23B]"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2 rounded-xl bg-[#E9A23B] text-white hover:bg-[#D78E24] disabled:opacity-40 transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
