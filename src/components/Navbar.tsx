import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Flame, 
  Sliders,
  ChevronDown,
  Brain
} from 'lucide-react';
import { FocusTrackId } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { FOCUS_TRACKS } from '../data/roomsData';

interface NavbarProps {
  completedCount: number;
  streakCount: number;
  onOpenQuickTidy: () => void;
  onOpenTips: (defaultRoomId?: string) => void;
  activeTrack: FocusTrackId;
  setActiveTrack: (t: FocusTrackId) => void;
  isPlayingSound: boolean;
  setIsPlayingSound: (p: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  streakCount,
  onOpenQuickTidy,
  onOpenTips,
  activeTrack,
  setActiveTrack,
  isPlayingSound,
  setIsPlayingSound,
}) => {
  const [showAudioDropdown, setShowAudioDropdown] = useState(false);
  const [volume, setVolume] = useState(45);

  const toggleSound = () => {
    if (isPlayingSound) {
      audioEngine.stopSoundtrack();
      setIsPlayingSound(false);
    } else {
      audioEngine.playSoundtrack(activeTrack);
      setIsPlayingSound(true);
    }
  };

  const handleTrackChange = (trackId: FocusTrackId) => {
    setActiveTrack(trackId);
    if (isPlayingSound) {
      audioEngine.playSoundtrack(trackId);
    }
    setShowAudioDropdown(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    audioEngine.setVolume(val / 100);
  };

  const currentTrackObj = FOCUS_TRACKS.find(t => t.id === activeTrack) || FOCUS_TRACKS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & AuDHD Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20 transform transition-transform hover:rotate-6">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Dopamine<span className="text-purple-600">Clean</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                  <Sparkles className="w-3 h-3 text-purple-600" /> AuDHD Friendly
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                15-Minute Sensory Blocks • Dopamine Music • Shame-Free Cleaning
              </p>
            </div>
          </div>

          {/* Center/Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Quick Tidy Mode Button */}
            <button
              onClick={onOpenQuickTidy}
              className="relative group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all cursor-pointer"
              title="Emergency 5-10 min blitz for unexpected visitors"
            >
              <Zap className="w-4 h-4 fill-white text-white animate-pulse" />
              <span className="hidden xs:inline">Quick Tidy</span>
              <span className="xs:hidden">Tidy</span>
              <span className="hidden lg:inline text-amber-100 text-xs font-normal border-l border-amber-300/40 pl-2">
                Visitor Blitz
              </span>
            </button>

            {/* Organizing Tips & Gemini Coach Button */}
            <button
              onClick={() => onOpenTips()}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 active:scale-95 transition-all text-sm font-bold cursor-pointer"
              title="AuDHD Tips & AI Organizing Advice"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Tips & Gemini</span>
              <span className="sm:hidden">Tips</span>
            </button>

            {/* Focus Soundscape Controller */}
            <div className="relative">
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isPlayingSound
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isPlayingSound ? 'Pause focus soundtrack' : 'Play focus soundtrack'}
                >
                  {isPlayingSound ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden md:inline">Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden md:inline">Music</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowAudioDropdown(!showAudioDropdown)}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Choose focus soundtrack"
                >
                  <span className="max-w-[70px] sm:max-w-[100px] truncate font-medium">
                    {currentTrackObj.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Soundscape Dropdown & Volume Popover */}
              {showAudioDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      AuDHD Focus Audio
                    </span>
                    <button
                      onClick={toggleSound}
                      className="text-xs text-purple-600 font-bold hover:underline cursor-pointer"
                    >
                      {isPlayingSound ? 'Stop' : 'Start'}
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-lg mb-2">
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-purple-600" />
                    )}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-600 w-8 text-right">
                      {volume}%
                    </span>
                  </div>

                  {/* Track List */}
                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    {FOCUS_TRACKS.map(track => (
                      <button
                        key={track.id}
                        onClick={() => handleTrackChange(track.id as FocusTrackId)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          activeTrack === track.id
                            ? 'bg-purple-100 text-purple-900 font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold truncate">{track.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{track.tag}</p>
                        </div>
                        {activeTrack === track.id && (
                          <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dopamine Tracker Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{completedCount} tasks</span>
              <span className="text-purple-400">•</span>
              <span className="text-purple-700">{completedCount * 15}m cleaned</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
