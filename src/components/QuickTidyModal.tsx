import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  X, 
  Check, 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Room, QuickTidyTask, FocusTrackId } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface QuickTidyModalProps {
  rooms: Room[];
  selectedRoomId?: string | null;
  onClose: () => void;
  activeTrack: FocusTrackId;
  isPlayingSound: boolean;
  setIsPlayingSound: (p: boolean) => void;
}

export const QuickTidyModal: React.FC<QuickTidyModalProps> = ({
  rooms,
  selectedRoomId = null,
  onClose,
  activeTrack,
  isPlayingSound,
  setIsPlayingSound,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedRoomId || 'all');
  
  // Aggregate quick tidy tasks
  const allTasks: QuickTidyTask[] = rooms.flatMap(r => r.quickTidyTasks);
  
  // Local state for completed tasks in this quick tidy session
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});

  // Rapid blitz timer
  const [blitzMinutes, setBlitzMinutes] = useState<number>(10);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            audioEngine.playTaskCompleteChime();
            try {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            } catch (e) {}
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleTask = (taskId: string) => {
    audioEngine.playPopSound();
    const nextState = !completedTaskIds[taskId];
    setCompletedTaskIds(prev => ({
      ...prev,
      [taskId]: nextState
    }));

    // If all tasks completed
    const updatedCount = Object.values({ ...completedTaskIds, [taskId]: nextState }).filter(Boolean).length;
    if (updatedCount === (activeFilter === 'all' ? allTasks.length : displayedTasks.length)) {
      audioEngine.playTaskCompleteChime();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleStartTimer = (mins: number) => {
    audioEngine.playPopSound();
    setBlitzMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsTimerRunning(true);
    if (activeTrack !== 'mute' && !isPlayingSound) {
      audioEngine.playSoundtrack(activeTrack);
      setIsPlayingSound(true);
    }
  };

  const toggleTimerState = () => {
    audioEngine.playPopSound();
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
      if (activeTrack !== 'mute' && !isPlayingSound) {
        audioEngine.playSoundtrack(activeTrack);
        setIsPlayingSound(true);
      }
    }
  };

  const resetTimer = () => {
    audioEngine.playPopSound();
    setIsTimerRunning(false);
    setSecondsRemaining(blitzMinutes * 60);
  };

  const displayedTasks = activeFilter === 'all'
    ? allTasks
    : allTasks.filter(t => t.roomId === activeFilter);

  const completedCount = displayedTasks.filter(t => completedTaskIds[t.id]).length;
  const totalCount = displayedTasks.length;
  const visitorReadyPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
                <Zap className="w-7 h-7 fill-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                    Quick Tidy Mode
                  </h2>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-white/30 px-2.5 py-0.5 rounded-full text-white">
                    Emergency Visitor Blitz
                  </span>
                </div>
                <p className="text-xs text-amber-100 font-medium mt-0.5">
                  High-impact 5–10 minute triage for unexpected guests. Zero perfectionism.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rapid Blitz Timer Strip */}
          <div className="mt-5 p-3.5 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-100 uppercase tracking-wider">
                Blitz Timer:
              </span>
              <span className="text-2xl font-black font-mono tracking-wider text-white">
                {formatTimer(secondsRemaining)}
              </span>
              <button
                onClick={toggleTimerState}
                className="px-3 py-1.5 rounded-xl bg-white text-orange-600 hover:bg-amber-100 font-black text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-amber-100 mr-1 font-semibold">Presets:</span>
              {[5, 10, 15].map(m => (
                <button
                  key={m}
                  onClick={() => handleStartTimer(m)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    blitzMinutes === m
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Room Filter Pills */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Rooms ({allTasks.length})
          </button>
          {rooms.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveFilter(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                activeFilter === r.id
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-black'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Readiness Meter */}
        <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Visitor Readiness: {visitorReadyPct}% ({completedCount}/{totalCount} Blitz Tasks)</span>
          </div>
          <div className="w-36 h-2 bg-amber-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${visitorReadyPct}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {displayedTasks.map(task => {
            const isDone = !!completedTaskIds[task.id];
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isDone
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                {/* Big Tactile Checkbox */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-slate-50'
                }`}>
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-bold text-sm ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        ⚡ {task.minutes} min
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {task.roomName}
                      </span>
                    </div>
                  </div>

                  {/* Why this matters for visitors */}
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="italic">{task.visitorTarget}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {displayedTasks.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No tasks match this filter.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Remember: Visitors care about feeling welcome, not museum perfection!
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Done Tidy Sprint
          </button>
        </div>

      </div>
    </div>
  );
};
