import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, CheckCircle2, 
  Presentation, Award, Globe, Users, BookOpen, Volume2, 
  WifiOff, Bot, Sparkles, ChevronRight 
} from 'lucide-react';
import { soundService } from '../services/soundService';

export interface SceneStep {
  id: number;
  title: string;
  role: 'teacher' | 'student' | 'parent' | 'offline';
  langCode?: string;
  duration: number; // seconds
  pitchHeading: string;
  pitchBullet: string;
}

export const SCENES: SceneStep[] = [
  {
    id: 1,
    title: '1. Language Diversity',
    role: 'teacher',
    langCode: 'hi',
    duration: 10,
    pitchHeading: '12 Major Indian Languages',
    pitchBullet: 'Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, Gujarati, Odia, Punjabi, Malayalam, Assamese & English with native script typography & voice synthesis.'
  },
  {
    id: 2,
    title: '2. Teacher Live Metrics',
    role: 'teacher',
    duration: 12,
    pitchHeading: 'Teacher Pulse & Real-time Sync',
    pitchBullet: '4 vital metrics: 92% Local Comprehension, 100% Offline Device Sync, 88% Dialect Retention, and 1,420 Active Rural Learners.'
  },
  {
    id: 3,
    title: '3. Dialect AI Transcreation',
    role: 'teacher',
    duration: 14,
    pitchHeading: 'Dialect-aware Transcreation (PS#26042)',
    pitchBullet: 'Converts rigid textbook science/math terms into rural village metaphors (e.g. Photosynthesis = Leaf Cooking on Hearth) with regional audio.'
  },
  {
    id: 4,
    title: '4. Student Roti Fractions',
    role: 'student',
    duration: 14,
    pitchHeading: 'Tactile Visual Math with Roti',
    pitchBullet: 'Interactive roti fraction visualizer (1/4, 1/2, 3/4) with colloquial names (आधी रोटी, पाव, पौन) and spoken syllable audio.'
  },
  {
    id: 5,
    title: '5. Student Visual Quiz',
    role: 'student',
    duration: 12,
    pitchHeading: 'Instant Tactile Feedback & Voice',
    pitchBullet: 'Gamified quiz with stamp confirmation, score counter, and voice explanation in the student’s mother tongue.'
  },
  {
    id: 6,
    title: '6. Parent Audio Report',
    role: 'parent',
    duration: 12,
    pitchHeading: 'Zero-Literacy Spoken Progress',
    pitchBullet: 'Rural parents listen to daily voice progress summaries in their mother tongue and can record voice doubts back to the teacher.'
  },
  {
    id: 7,
    title: '7. Offline Pack & Sync',
    role: 'offline',
    duration: 8,
    pitchHeading: 'Zero-Connectivity Architecture',
    pitchBullet: 'IndexedDB/SQLite local caching saves 94% mobile data and runs without cellular coverage in remote schools.'
  },
  {
    id: 8,
    title: '8. In-Phone Bhasha Buddy',
    role: 'student',
    duration: 8,
    pitchHeading: 'Multilingual In-Phone AI Tutor',
    pitchBullet: 'Embedded robot buddy detects any input language, answers doubts with local examples, and speaks answers aloud.'
  }
];

interface PresentationGuideProps {
  activeRole: 'teacher' | 'student' | 'parent' | 'offline';
  onSelectRole: (role: 'teacher' | 'student' | 'parent' | 'offline') => void;
  onSelectLanguage: (code: string) => void;
}

export const PresentationGuide: React.FC<PresentationGuideProps> = ({
  activeRole,
  onSelectRole,
  onSelectLanguage,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(SCENES[0].duration);

  const currentScene = SCENES[activeSceneIndex];

  // Auto-advance loop when playing 90s tour
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingTour) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Advance to next scene
            const nextIdx = (activeSceneIndex + 1) % SCENES.length;
            handleJumpToScene(nextIdx);
            return SCENES[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingTour, activeSceneIndex]);

  const handleJumpToScene = (idx: number) => {
    soundService.playTapSound();
    setActiveSceneIndex(idx);
    const scene = SCENES[idx];
    setSecondsRemaining(scene.duration);
    onSelectRole(scene.role);
    if (scene.langCode) {
      onSelectLanguage(scene.langCode);
    }
  };

  const handleTogglePlay = () => {
    soundService.playTapSound();
    setIsPlayingTour(!isPlayingTour);
  };

  const handleRestart = () => {
    soundService.playTapSound();
    handleJumpToScene(0);
    setIsPlayingTour(true);
  };

  return (
    <div className="bg-[#FAF8F3] border border-[#E5D9C5] rounded-3xl p-4 shadow-sm space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-[#E2D7C4] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#192033] text-[#E9A23B]">
            <Presentation size={18} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#192033] tracking-wide uppercase">
              SIH 2026 Presentation Companion
            </h2>
            <p className="text-[10px] text-[#616B82]">
              Problem Statement PS#26042 • 90-Second Guided Tour
            </p>
          </div>
        </div>

        {/* Guided Play Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              isPlayingTour
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-[#E9A23B] hover:bg-[#D78E24] text-white'
            }`}
          >
            {isPlayingTour ? (
              <>
                <Pause size={13} />
                <span>Pause ({secondsRemaining}s)</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-current" />
                <span>Play 90s Tour</span>
              </>
            )}
          </button>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-xl border border-[#E5D9C5] bg-white text-[#192033] hover:bg-gray-100 transition-colors"
            title="Restart Tour"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Active Scene Spotlight Card (Great for PPT slide narration) */}
      <div className="p-3.5 bg-white rounded-2xl border-2 border-[#E9A23B]/30 shadow-xs relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#192033] text-white">
            SCENE {currentScene.id} OF {SCENES.length}
          </span>
          <span className="text-[10px] font-mono text-[#D97706] font-bold">
            Target View: {currentScene.role.toUpperCase()}
          </span>
        </div>
        <h3 className="text-sm font-bold text-[#192033]">
          {currentScene.pitchHeading}
        </h3>
        <p className="text-xs text-[#57617A] leading-relaxed mt-1">
          {currentScene.pitchBullet}
        </p>
      </div>

      {/* Progress Spine (Interactive Steps) */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#616B82] mb-2">
          Click Any Scene to Demo for PPT:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SCENES.map((scene, idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => handleJumpToScene(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#192033] text-white border-[#192033] shadow-sm ring-2 ring-[#E9A23B]/60'
                    : 'bg-white text-[#192033] border-[#E5D9C5] hover:border-[#E9A23B]'
                }`}
              >
                <div className="font-bold text-[11px] truncate">{scene.title}</div>
                <div className={`text-[9px] mt-1 flex items-center justify-between ${isActive ? 'text-[#E9A23B]' : 'text-[#616B82]'}`}>
                  <span>{scene.role}</span>
                  {isActive && <CheckCircle2 size={11} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Talking Points for PPT Jury */}
      <div className="p-3 bg-[#FAF6EF] border border-[#E8DFC9] rounded-2xl text-[11px] text-[#57617A] space-y-1.5">
        <div className="font-bold text-[#192033] flex items-center gap-1.5">
          <Sparkles size={12} className="text-[#E9A23B]" />
          <span>PPT Submission Highlights (Smart India Hackathon):</span>
        </div>
        <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
          <li><strong>Universal Speech Layer:</strong> Guarantees audible pronunciation for all 12 Indian languages even on devices lacking OS voice packs.</li>
          <li><strong>Dialect Transcreation:</strong> Bridges academic textbook Hindi/Bengali/Tamil with localized rural dialects & kitchen hearth metaphors.</li>
          <li><strong>Zero-Literacy Design:</strong> Spoken audio cards ensure rural parents with limited reading ability actively participate in their child's education.</li>
        </ul>
      </div>
    </div>
  );
};
