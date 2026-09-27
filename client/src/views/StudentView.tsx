import React, { useState } from 'react';
import { Volume2, Sparkles, HelpCircle, CheckCircle2, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { LanguageData } from '../data/languages';
import { soundService } from '../services/soundService';

interface StudentViewProps {
  currentLanguage: LanguageData;
}

export const StudentView: React.FC<StudentViewProps> = ({ currentLanguage }) => {
  const [selectedFractionIndex, setSelectedFractionIndex] = useState(1); // Default to 1/2 (आधी रोटी)
  const [activeTab, setActiveTab] = useState<'roti' | 'quiz'>('roti');
  
  // Quiz State
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const activeFraction = currentLanguage.rotiLesson.fractions[selectedFractionIndex] || currentLanguage.rotiLesson.fractions[0];
  const currentQuiz = currentLanguage.quiz[quizQuestionIndex] || currentLanguage.quiz[0];

  const handleFractionClick = (index: number) => {
    soundService.playTapSound();
    setSelectedFractionIndex(index);
    const fractionData = currentLanguage.rotiLesson.fractions[index];
    if (fractionData) {
      soundService.speak(`${fractionData.label}. ${fractionData.audioSpoken}`, currentLanguage.bcp47);
    }
  };

  const handlePlayHint = () => {
    soundService.playTapSound();
    if (activeFraction) {
      soundService.speak(activeFraction.audioSpoken, currentLanguage.bcp47);
    }
  };

  const handleOptionSelect = (optIndex: number) => {
    if (isAnswerSubmitted) return;
    soundService.playTapSound();
    setSelectedOption(optIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuiz.correctIndex;
    if (isCorrect) {
      soundService.playCorrectSound();
      soundService.playStampSound();
      setScore((prev) => prev + 1);
      soundService.speak(currentQuiz.audioText || currentQuiz.explanation, currentLanguage.bcp47);
    } else {
      soundService.playWrongSound();
      soundService.speak(currentQuiz.explanation, currentLanguage.bcp47);
    }
  };

  const handleNextQuestion = () => {
    soundService.playTapSound();
    if (quizQuestionIndex + 1 < currentLanguage.quiz.length) {
      setQuizQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setHasCompletedQuiz(true);
      soundService.playStampSound();
      soundService.speak(`शाबाश! आपने क्विज़ पूरा किया। कुल स्कोर ${score + (selectedOption === currentQuiz.correctIndex ? 1 : 0)}`, currentLanguage.bcp47);
    }
  };

  const handleResetQuiz = () => {
    soundService.playTapSound();
    setQuizQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setHasCompletedQuiz(false);
  };

  // Helper to draw SVG slices for the Roti
  const renderRotiVisualizer = () => {
    const fractionVal = activeFraction.fraction; // '1', '1/2', '1/4', '3/4'

    return (
      <div className="relative w-44 h-44 mx-auto my-3 flex items-center justify-center">
        {/* Shadow and plate base */}
        <div className="absolute inset-0 rounded-full bg-[#E5D7BE] filter blur-xs transform translate-y-1"></div>
        <div className="absolute inset-1 rounded-full bg-[#EFE5D2] border-2 border-[#D8C7A8] shadow-inner"></div>

        {/* SVG Roti Slices */}
        <svg viewBox="0 0 100 100" className="w-38 h-38 transform -rotate-90 filter drop-shadow-md">
          {/* Base toasted wheat gradient */}
          <defs>
            <radialGradient id="rotiWheat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5DFB8" />
              <stop offset="70%" stopColor="#E6C894" />
              <stop offset="100%" stopColor="#C49B5D" />
            </radialGradient>
            <radialGradient id="highlightSlice" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>

          {/* Slices representation based on fraction selection */}
          {fractionVal === '1' && (
            <circle cx="50" cy="50" r="46" fill="url(#highlightSlice)" stroke="#A07238" strokeWidth="1.5" />
          )}

          {fractionVal === '1/2' && (
            <>
              {/* Active Half (Top) */}
              <path
                d="M 50,50 L 50,4 A 46,46 0 0,1 50,96 Z"
                fill="url(#highlightSlice)"
                stroke="#A07238"
                strokeWidth="1.5"
                className="transform transition-transform duration-300 hover:translate-x-1"
              />
              {/* Unselected Half (Bottom, muted) */}
              <path
                d="M 50,50 L 50,96 A 46,46 0 0,1 50,4 Z"
                fill="#E8DCBF"
                stroke="#D0C09F"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />
            </>
          )}

          {fractionVal === '1/4' && (
            <>
              {/* Active Quarter (Quadrant 1) */}
              <path
                d="M 50,50 L 50,4 A 46,46 0 0,1 96,50 Z"
                fill="url(#highlightSlice)"
                stroke="#A07238"
                strokeWidth="1.5"
                className="transform transition-transform duration-300 hover:scale-105"
              />
              {/* Remaining 3 quarters dashed */}
              <path
                d="M 50,50 L 96,50 A 46,46 0 1,1 50,4 Z"
                fill="#E8DCBF"
                stroke="#D0C09F"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.45"
              />
            </>
          )}

          {fractionVal === '3/4' && (
            <>
              {/* Active 3 Quarters */}
              <path
                d="M 50,50 L 50,4 A 46,46 0 1,1 4,50 Z"
                fill="url(#highlightSlice)"
                stroke="#A07238"
                strokeWidth="1.5"
              />
              {/* Remaining 1 quarter muted */}
              <path
                d="M 50,50 L 4,50 A 46,46 0 0,1 50,4 Z"
                fill="#E8DCBF"
                stroke="#D0C09F"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.4"
              />
            </>
          )}

          {/* Authentic toasted brown marks / scorch spots */}
          <circle cx="38" cy="42" r="3" fill="#8B5A2B" opacity="0.6" />
          <circle cx="62" cy="35" r="4.5" fill="#7A4B1F" opacity="0.5" />
          <circle cx="68" cy="65" r="3" fill="#8B5A2B" opacity="0.55" />
          <circle cx="34" cy="68" r="4" fill="#9C6633" opacity="0.5" />
          <circle cx="48" cy="52" r="2.5" fill="#693C15" opacity="0.7" />
        </svg>

        {/* Floating Fraction Badge */}
        <div className="absolute -bottom-2 bg-[#192033] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md border border-[#E9A23B]">
          {activeFraction.fraction}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 pb-6">
      {/* View Switcher Tabs: Lesson vs Quiz */}
      <div className="flex p-1 bg-[#F3ECE1] border border-[#E5D9C5] rounded-xl">
        <button
          onClick={() => {
            soundService.playTapSound();
            setActiveTab('roti');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'roti'
              ? 'bg-white text-[#192033] shadow-xs'
              : 'text-[#616B82] hover:text-[#192033]'
          }`}
        >
          🥖 {currentLanguage.rotiLesson.title.split(' ')[0]} Lesson
        </button>
        <button
          onClick={() => {
            soundService.playTapSound();
            setActiveTab('quiz');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'quiz'
              ? 'bg-white text-[#192033] shadow-xs'
              : 'text-[#616B82] hover:text-[#192033]'
          }`}
        >
          ⭐ Practice Quiz ({currentLanguage.quiz.length})
        </button>
      </div>

      {activeTab === 'roti' ? (
        /* Roti Interactive Fraction Lesson */
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5D9C5] shadow-sm">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-sm font-bold text-[#192033] leading-snug">
              {currentLanguage.rotiLesson.title}
            </h2>
            <p className="text-[10px] text-[#616B82] mt-0.5">
              {currentLanguage.rotiLesson.subtitle}
            </p>
          </div>

          {/* Interactive Roti SVG Display */}
          {renderRotiVisualizer()}

          {/* Fraction Selector Buttons */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {currentLanguage.rotiLesson.fractions.map((f, idx) => (
              <button
                key={f.fraction}
                onClick={() => handleFractionClick(idx)}
                className={`py-2 px-1 rounded-xl text-center border transition-all ${
                  selectedFractionIndex === idx
                    ? 'bg-[#192033] text-white border-[#192033] shadow-sm scale-102'
                    : 'bg-[#FAF8F3] text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                }`}
              >
                <div className="text-xs font-bold">{f.fraction}</div>
                <div className="text-[9px] truncate font-medium mt-0.5 opacity-90">{f.label}</div>
              </button>
            ))}
          </div>

          {/* Current Fraction Explanatory Card */}
          <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E8DFC9] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#B45309] block">
                  {activeFraction.vernacularTerm}
                </span>
                <h4 className="text-xs font-bold text-[#192033]">{activeFraction.label} ({activeFraction.fraction})</h4>
              </div>
              <button
                onClick={handlePlayHint}
                className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-[#E9A23B] hover:bg-[#D78E24] text-white rounded-lg shadow-2xs transition-all"
              >
                <Volume2 size={12} />
                <span>{currentLanguage.ui.listenAudio}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#57617A] leading-relaxed">
              {activeFraction.description}
            </p>

            <div className="flex items-center gap-2 pt-1.5 border-t border-[#E8DFC9]/70">
              <button
                onClick={handlePlayHint}
                className="text-[10px] font-semibold text-[#192033] hover:text-[#E9A23B] flex items-center gap-1"
              >
                <RotateCcw size={10} />
                <span>{currentLanguage.ui.repeatAudio}</span>
              </button>
              <span className="text-gray-300">•</span>
              <span className="text-[9px] text-[#15803D] font-medium">✓ Spoken in {currentLanguage.nativeName}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Visual Interactive Quiz */
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5D9C5] shadow-sm">
          {!hasCompletedQuiz ? (
            <div className="space-y-3">
              {/* Quiz Header & Progress */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E5D9C5]">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#192033] text-white text-[9px] font-bold">
                    Q{quizQuestionIndex + 1}/{currentLanguage.quiz.length}
                  </span>
                  <span className="text-[10px] text-[#616B82] font-medium">Visual Math Quiz</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#D97706]">
                  <Award size={13} />
                  <span>{currentLanguage.ui.score}: {score}</span>
                </div>
              </div>

              {/* Question Text & Audio Button */}
              <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E8DFC9] relative">
                <p className="text-xs font-bold text-[#192033] leading-snug pr-7">
                  {currentQuiz.question}
                </p>
                <button
                  onClick={() => {
                    soundService.playTapSound();
                    soundService.speak(currentQuiz.question, currentLanguage.bcp47);
                  }}
                  className="absolute right-2 top-2 p-1.5 rounded-full bg-white border border-[#E2D7C4] text-[#E9A23B] hover:bg-[#E9A23B] hover:text-white transition-colors"
                  title="Read question aloud"
                >
                  <Volume2 size={13} />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQuiz.options.map((opt, oIdx) => {
                  let optStyle = 'bg-white border-[#E5D9C5] text-[#192033] hover:border-[#E9A23B]';

                  if (selectedOption === oIdx) {
                    if (isAnswerSubmitted) {
                      optStyle = oIdx === currentQuiz.correctIndex
                        ? 'bg-green-50 border-green-500 text-green-900 font-bold'
                        : 'bg-red-50 border-red-400 text-red-900';
                    } else {
                      optStyle = 'bg-[#192033] text-white border-[#192033] font-bold shadow-xs';
                    }
                  } else if (isAnswerSubmitted && oIdx === currentQuiz.correctIndex) {
                    optStyle = 'bg-green-50 border-green-500 text-green-900 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(oIdx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && oIdx === currentQuiz.correctIndex && (
                        <CheckCircle2 size={14} className="text-green-600 shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E8DFC9] space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className={selectedOption === currentQuiz.correctIndex ? 'stamp-badge-green text-xs' : 'stamp-badge text-xs'}>
                      {selectedOption === currentQuiz.correctIndex ? currentLanguage.ui.correct : currentLanguage.ui.needsPractice}
                    </span>
                    <button
                      onClick={() => {
                        soundService.playTapSound();
                        soundService.speak(currentQuiz.explanation, currentLanguage.bcp47);
                      }}
                      className="flex items-center gap-1 text-[10px] font-bold text-[#E9A23B]"
                    >
                      <Volume2 size={12} />
                      <span>Hear Explanation</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#57617A] leading-relaxed">
                    {currentQuiz.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full py-2 bg-[#E9A23B] hover:bg-[#D78E24] text-white font-bold text-xs rounded-xl disabled:opacity-40 transition-all shadow-xs"
                  >
                    {currentLanguage.ui.submitAnswer}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2 bg-[#192033] hover:bg-[#2B3550] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>{currentLanguage.ui.nextQuestion}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-5 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FEF3C7] text-[#D97706] mx-auto flex items-center justify-center shadow-inner">
                <Award size={28} />
              </div>
              <div className="stamp-badge-green text-sm px-3 py-1">
                ★ CERTIFIED MASTERED ★
              </div>
              <h3 className="text-sm font-bold text-[#192033]">
                Quiz Completed with {score}/{currentLanguage.quiz.length} Stars!
              </h3>
              <p className="text-[11px] text-[#616B82] max-w-xs mx-auto">
                Excellent mastery of fractions using local village models. Ready to advance to the next rural math unit!
              </p>
              <button
                onClick={handleResetQuiz}
                className="py-2 px-4 bg-[#E9A23B] text-white font-bold text-xs rounded-xl hover:bg-[#D78E24] transition-all"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
