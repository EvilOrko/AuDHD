import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Plus, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Coffee, 
  Heart, 
  Check, 
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { CleaningTask, FocusTrackId } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { FOCUS_TRACKS } from '../data/roomsData';

interface TaskTimerModalProps {
  task: CleaningTask;
  roomName: string;
  roomColor: string;
  onClose: () => void;
  onComplete: (taskId: string) => void;
  activeTrack: FocusTrackId;
  setActiveTrack: (t: FocusTrackId) => void;
  isPlayingSound: boolean;
  setIsPlayingSound: (p: boolean) => void;
}

export const TaskTimerModal: React.FC<TaskTimerModalProps> = ({
  task,
  roomName,
  roomColor,
  onClose,
  onComplete,
  activeTrack,
  setActiveTrack,
  isPlayingSound,
  setIsPlayingSound,
}) => {
  // 15 minutes by default = 900 seconds
  const defaultSeconds = (task.estimatedMinutes || 15) * 60;
  const [totalSeconds, setTotalSeconds] = useState(defaultSeconds);
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(300); // 5 minute break default
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const timerRef = useRef<any>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']
      });
    } catch (e) {
      // ignore if canvas unavailable
    }
  };

  // Start sound when timer starts
  useEffect(() => {
    if (activeTrack !== 'mute') {
      audioEngine.playSoundtrack(activeTrack);
      setIsPlayingSound(true);
    }
    return () => {
      // Don't necessarily stop global music unless closing or timer ends
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Main countdown loop
  useEffect(() => {
    if (isRunning && !isFinished && !isBreakMode) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFinished, isBreakMode]);

  // Break countdown loop
  useEffect(() => {
    if (isBreakMode) {
      const breakInterval = setInterval(() => {
        setBreakSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(breakInterval);
    }
  }, [isBreakMode]);

  // Handle when 15 minutes expires
  const handleTimerExpired = () => {
    setIsRunning(false);
    setIsFinished(true);
    // Stop music
    audioEngine.stopSoundtrack();
    setIsPlayingSound(false);
    // Play celebratory gentle chime
    audioEngine.playTaskCompleteChime();
    // Confetti
    triggerConfetti();
    // Mark completed in parent
    onComplete(task.id);
  };

  // Manual completion button
  const handleManualComplete = () => {
    audioEngine.playPopSound();
    handleTimerExpired();
  };

  const toggleTimer = () => {
    audioEngine.playPopSound();
    if (isRunning) {
      setIsRunning(false);
      audioEngine.stopSoundtrack();
      setIsPlayingSound(false);
    } else {
      setIsRunning(true);
      if (activeTrack !== 'mute') {
        audioEngine.playSoundtrack(activeTrack);
        setIsPlayingSound(true);
      }
    }
  };

  const resetTimer = () => {
    audioEngine.playPopSound();
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    audioEngine.stopSoundtrack();
    setIsPlayingSound(false);
  };

  const addMinutes = (mins: number) => {
    audioEngine.playPopSound();
    setSecondsLeft(prev => prev + mins * 60);
    setTotalSeconds(prev => prev + mins * 60);
  };

  const setBlockDuration = (mins: number) => {
    audioEngine.playPopSound();
    const sec = mins * 60;
    setTotalSeconds(sec);
    setSecondsLeft(sec);
    setIsRunning(false);
    audioEngine.stopSoundtrack();
    setIsPlayingSound(false);
  };

  const handleTrackChange = (t: FocusTrackId) => {
    setActiveTrack(t);
    if (isRunning && t !== 'mute') {
      audioEngine.playSoundtrack(t);
      setIsPlayingSound(true);
    } else if (t === 'mute') {
      audioEngine.stopSoundtrack();
      setIsPlayingSound(false);
    }
  };

  const toggleMicroStep = (idx: number) => {
    audioEngine.playPopSound();
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // SVG Progress calculation
  const progress = totalSeconds > 0 ? (secondsLeft / totalSeconds) : 0;
  const strokeDashoffset = 2 * Math.PI * 105 * (1 - progress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              {roomName}
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-1 line-clamp-1">
              {task.title}
            </h2>
          </div>
          <button
            onClick={() => {
              audioEngine.stopSoundtrack();
              setIsPlayingSound(false);
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Finished or Break Screen */}
          {isFinished ? (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Block Completed! 🎉
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Awesome job overcoming inertia! You just completed your 15-minute focused sprint.
                </p>
              </div>

              {/* Break Callout */}
              <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl text-left space-y-3">
                <div className="flex items-center gap-2 text-purple-900 font-black text-base">
                  <Coffee className="w-5 h-5 text-purple-600" />
                  <span>Time For A Sensory Break (3-5 Minutes)</span>
                </div>
                <p className="text-xs text-purple-800 font-medium">
                  AuDHD wisdom: Stepping away resets dopamine and prevents mental burnout.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl">
                    <span>💧 Drink a tall glass of cold water</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl">
                    <span>🧘 Shake out hands & roll shoulders</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl">
                    <span>👀 Look out a window into distance</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl">
                    <span>🐾 Pet an animal or grab a quick snack</span>
                  </div>
                </div>

                {/* Optional Break Timer */}
                {!isBreakMode ? (
                  <button
                    onClick={() => {
                      audioEngine.playPopSound();
                      setIsBreakMode(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Coffee className="w-4 h-4" /> Start 5-Minute Break Timer
                  </button>
                ) : (
                  <div className="text-center p-3 bg-white rounded-xl border border-purple-300">
                    <span className="text-xs font-bold text-purple-600 uppercase">Break Timer:</span>
                    <p className="text-3xl font-black text-slate-800 font-mono">
                      {formatTime(breakSecondsLeft)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    audioEngine.stopSoundtrack();
                    setIsPlayingSound(false);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md cursor-pointer transition-all"
                >
                  Return to Room List
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Visual Countdown Dial */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  
                  {/* SVG Circular Progress */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="105"
                      className="stroke-slate-100"
                      strokeWidth="16"
                      fill="transparent"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="105"
                      className="transition-all duration-1000 ease-linear"
                      stroke={roomColor || '#8B5CF6'}
                      strokeWidth="16"
                      strokeDasharray={2 * Math.PI * 105}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Center Time Display & Pulse */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-black font-mono tracking-tight text-slate-900">
                      {formatTime(secondsLeft)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {isRunning ? 'Focus Sprint In Progress' : 'Sprint Paused'}
                    </span>

                    {/* Audio Wave Indicator if Playing */}
                    {isRunning && activeTrack !== 'mute' && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" />
                        <span className="w-1 h-5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span className="w-1 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.45s]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration Presets */}
                <div className="flex items-center gap-2 mt-2">
                  {[5, 10, 15, 20].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setBlockDuration(mins)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        totalSeconds === mins * 60
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                  <button
                    onClick={() => addMinutes(2)}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Add 2 minutes"
                  >
                    <Plus className="w-3 h-3" /> 2m
                  </button>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetTimer}
                  className="p-3.5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleTimer}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Pause Sprint</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>Resume Sprint</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleManualComplete}
                  className="px-4 py-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Mark finished early"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Done Early</span>
                </button>
              </div>

              {/* Soundscape Selector Pill */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Focus Soundscape (ADHD Tuned)</span>
                  </span>
                  <span className="text-[11px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    {FOCUS_TRACKS.find(t => t.id === activeTrack)?.tag}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {FOCUS_TRACKS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTrackChange(t.id as FocusTrackId)}
                      className={`text-left p-2 rounded-xl text-xs transition-all cursor-pointer border ${
                        activeTrack === t.id
                          ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <p className="font-bold truncate">{t.name.split(' ')[0]}</p>
                      <p className={`text-[10px] truncate ${activeTrack === t.id ? 'text-purple-100' : 'text-slate-400'}`}>
                        {t.tag}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Micro-steps checklist inside timer (so ADHD working memory doesn't drop) */}
              {task.microSteps && task.microSteps.length > 0 && (
                <div className="space-y-2 bg-purple-50/50 p-4 rounded-2xl border border-purple-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
                    Micro-Steps (Check off as you go):
                  </span>
                  <div className="space-y-1.5">
                    {task.microSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleMicroStep(idx)}
                        className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          completedSteps[idx]
                            ? 'bg-emerald-100/80 text-emerald-900 font-medium line-through'
                            : 'bg-white text-slate-700 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
                          completedSteps[idx] ? 'bg-emerald-500 border-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {completedSteps[idx] && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{step}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sensory Tip */}
              {task.sensoryTip && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Sensory Comfort Tip: </span>
                    <span>{task.sensoryTip}</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
