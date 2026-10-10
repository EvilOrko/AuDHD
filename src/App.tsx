import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  BookOpen, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { Room, CleaningTask, FocusTrackId } from './types';
import { INITIAL_ROOMS } from './data/roomsData';
import { Navbar } from './components/Navbar';
import { RoomCard } from './components/RoomCard';
import { RoomDetail } from './components/RoomDetail';
import { TaskTimerModal } from './components/TaskTimerModal';
import { QuickTidyModal } from './components/QuickTidyModal';
import { TipsAndGeminiModal } from './components/TipsAndGeminiModal';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  // Load rooms from localStorage if present
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('dopamine_clean_rooms');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ROOMS;
  });

  // Track completed count
  const [completedCount, setCompletedCount] = useState<number>(() => {
    try {
      const count = localStorage.getItem('dopamine_clean_completed_count');
      if (count) return parseInt(count, 10);
    } catch (e) {}
    return 0;
  });

  // View state
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Modals state
  const [activeTaskForTimer, setActiveTaskForTimer] = useState<CleaningTask | null>(null);
  const [isQuickTidyOpen, setIsQuickTidyOpen] = useState<boolean>(false);
  const [quickTidyInitialRoom, setQuickTidyInitialRoom] = useState<string | null>(null);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState<boolean>(false);
  const [tipsInitialRoom, setTipsInitialRoom] = useState<string | null>(null);

  // Audio state
  const [activeTrack, setActiveTrack] = useState<FocusTrackId>('lofi');
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dopamine_clean_rooms', JSON.stringify(rooms));
      const totalDone = rooms.flatMap(r => r.tasks).filter(t => t.completed).length;
      setCompletedCount(totalDone);
      localStorage.setItem('dopamine_clean_completed_count', totalDone.toString());
    } catch (e) {
      console.error(e);
    }
  }, [rooms]);

  // Handle task completion from Timer Modal
  const handleTaskCompleted = (taskId: string) => {
    setRooms(prev =>
      prev.map(r => ({
        ...r,
        tasks: r.tasks.map(t =>
          t.id === taskId
            ? { ...t, completed: true, completedAt: new Date().toISOString() }
            : t
        )
      }))
    );
  };

  // Toggle task complete manually
  const handleToggleTaskComplete = (roomId: string, taskId: string) => {
    setRooms(prev =>
      prev.map(r =>
        r.id === roomId
          ? {
              ...r,
              tasks: r.tasks.map(t =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              )
            }
          : r
      )
    );
  };

  // Add custom task
  const handleAddTask = (roomId: string, newTask: Omit<CleaningTask, 'id' | 'completed'>) => {
    const task: CleaningTask = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setRooms(prev =>
      prev.map(r => (r.id === roomId ? { ...r, tasks: [task, ...r.tasks] } : r))
    );
  };

  // Reset all tasks
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const handleResetAllTasks = () => {
    audioEngine.playPopSound();
    setRooms(INITIAL_ROOMS);
    setShowResetConfirm(false);
  };

  const currentRoom = rooms.find(r => r.id === activeRoomId);

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Sticky Header */}
      <Navbar
        completedCount={completedCount}
        streakCount={Math.ceil(completedCount / 3)}
        onOpenQuickTidy={() => {
          setQuickTidyInitialRoom(null);
          setIsQuickTidyOpen(true);
        }}
        onOpenTips={(roomId) => {
          setTipsInitialRoom(roomId || null);
          setIsTipsModalOpen(true);
        }}
        activeTrack={activeTrack}
        setActiveTrack={setActiveTrack}
        isPlayingSound={isPlayingSound}
        setIsPlayingSound={setIsPlayingSound}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Room Detail View OR Main Room Selection Screen */}
        {currentRoom ? (
          <RoomDetail
            room={currentRoom}
            onBack={() => setActiveRoomId(null)}
            onStartTask={(task) => setActiveTaskForTimer(task)}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAddTask={handleAddTask}
            onOpenQuickTidy={(roomId) => {
              setQuickTidyInitialRoom(roomId);
              setIsQuickTidyOpen(true);
            }}
            onOpenTips={(roomId) => {
              setTipsInitialRoom(roomId);
              setIsTipsModalOpen(true);
            }}
          />
        ) : (
          /* Main Room Grid Screen */
          <div className="space-y-8">
            
            {/* Dopamine Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white p-8 sm:p-10 shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md text-white border border-white/25">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Executive Function Support Engine</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans drop-shadow-xs">
                  Clean Without The Overwhelm.
                </h1>

                <p className="text-sm sm:text-base text-purple-100 font-medium leading-relaxed">
                  Choose a room below. Every task is capped at a gentle 15-minute sprint with focus soundscapes, visual timers, and built-in dopamine breaks.
                </p>

                {/* Quick Action Buttons inside Hero */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setQuickTidyInitialRoom(null);
                      setIsQuickTidyOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Quick Tidy (Visitor Mode)</span>
                  </button>

                  <button
                    onClick={() => {
                      setTipsInitialRoom(null);
                      setIsTipsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>AuDHD Tips & Gemini Coach</span>
                  </button>
                </div>

              </div>

              {/* Decorative background shapes */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 blur-2xl pointer-events-none rounded-full" />
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-pink-400/20 blur-3xl pointer-events-none rounded-full" />
            </div>

            {/* Room Selection Heading */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-sans tracking-tight">
                  Your House Zones
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Click a room to start 15-minute structured tasks
                </p>
              </div>

              <div className="flex items-center gap-2">
                {showResetConfirm ? (
                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 p-1 rounded-xl">
                    <span className="text-[11px] font-bold text-rose-700 px-1.5">Reset all?</span>
                    <button
                      onClick={handleResetAllTasks}
                      className="px-2 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-2 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset all tasks for a fresh day"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Checklists</span>
                  </button>
                )}
              </div>
            </div>

            {/* Room Cards 6-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelect={(id) => {
                    audioEngine.playPopSound();
                    setActiveRoomId(id);
                  }}
                  onQuickTidySelect={(id) => {
                    setQuickTidyInitialRoom(id);
                    setIsQuickTidyOpen(true);
                  }}
                  onOpenTips={(id) => {
                    setTipsInitialRoom(id);
                    setIsTipsModalOpen(true);
                  }}
                />
              ))}
            </div>

            {/* AuDHD Philosophy & Micro-Break Reminder Footer */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    The AuDHD Promise: "Done Is Better Than Perfect"
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    A 5-minute halfway tidy that makes your space breathable is 100x more valuable than paralyzed perfectionism.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTipsModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs shrink-0 transition-colors cursor-pointer"
              >
                Read ADHD Strategies
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Task Timer Modal */}
      {activeTaskForTimer && (
        <TaskTimerModal
          task={activeTaskForTimer}
          roomName={currentRoom ? currentRoom.name : 'Cleaning Sprint'}
          roomColor={currentRoom ? currentRoom.colorTheme.accent : '#8B5CF6'}
          onClose={() => setActiveTaskForTimer(null)}
          onComplete={handleTaskCompleted}
          activeTrack={activeTrack}
          setActiveTrack={setActiveTrack}
          isPlayingSound={isPlayingSound}
          setIsPlayingSound={setIsPlayingSound}
        />
      )}

      {/* Quick Tidy (Visitor Blitz) Modal */}
      {isQuickTidyOpen && (
        <QuickTidyModal
          rooms={rooms}
          selectedRoomId={quickTidyInitialRoom}
          onClose={() => setIsQuickTidyOpen(false)}
          activeTrack={activeTrack}
          isPlayingSound={isPlayingSound}
          setIsPlayingSound={setIsPlayingSound}
        />
      )}

      {/* Tips & Gemini AI Coach Modal */}
      {isTipsModalOpen && (
        <TipsAndGeminiModal
          rooms={rooms}
          initialRoomId={tipsInitialRoom}
          onClose={() => setIsTipsModalOpen(false)}
        />
      )}

    </div>
  );
}
