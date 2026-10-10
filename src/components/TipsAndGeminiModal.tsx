import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  X, 
  Send, 
  Brain, 
  Layers, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Loader2,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Room } from '../types';
import { ADHD_ORGANIZING_STRATEGIES } from '../data/adhdTipsData';
import { audioEngine } from '../utils/audioEngine';
import { getOfflineAuDHDAdvice } from '../utils/offlineAdhdCoach';

interface TipsAndGeminiModalProps {
  rooms: Room[];
  initialRoomId?: string | null;
  onClose: () => void;
}

export const TipsAndGeminiModal: React.FC<TipsAndGeminiModalProps> = ({
  rooms,
  initialRoomId = null,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'gemini'>('tips');
  const [selectedRoomContext, setSelectedRoomContext] = useState<string>(initialRoomId || 'general');
  const [questionInput, setQuestionInput] = useState<string>('');
  const [isLoadingGemini, setIsLoadingGemini] = useState<boolean>(false);
  
  // Chat / advice history with Gemini
  const [geminiAdviceList, setGeminiAdviceList] = useState<
    { id: string; room: string; question: string; answer: string; timestamp: string }[]
  >([
    {
      id: 'default-1',
      room: 'Craft & Maker Room',
      question: 'How do I organize my 4-tier 40" x 18" storage shelf without losing things?',
      answer: `Here is a shame-free, neurodivergent strategy:
1. **Tier by Weight & Frequency:**
   • Tier 1 (Eye Level / Top): Current weekly craft blanks & safety gear.
   • Tier 2 & 3: Transparent, clear-front acrylic bins for vinyl rolls, paints, and hardware. If you can't see through the container, it ceases to exist for ADHD working memory!
   • Tier 4 (Bottom 18" depth): Heavy filament dry totes and bulk wood bundles.
2. **High-Contrast Labels:** Use a bold label maker or white chalkboard paint on the front lip of each shelf.
3. **The 1-In, 1-Out Rule for Scraps:** Keep only one designated 12" bin for wood/acrylic cut-offs. Once that bin is full, toss or burn the rest!`,
      timestamp: '2 mins ago'
    }
  ]);

  const quickQuestions = [
    {
      room: 'craft_room',
      text: 'How should I store vinyl cutter scraps and weeding picks?'
    },
    {
      room: 'craft_room',
      text: 'How to organize 3D printer filaments so moisture doesn\'t ruin them?'
    },
    {
      room: 'craft_room',
      text: 'My craft room closet is a complete avalanche. Where do I start?'
    },
    {
      room: 'teen_room',
      text: 'How to clean with my teenager without triggering an argument?'
    },
    {
      room: 'kitchen',
      text: 'I have severe sensory disgust with wet food in the sink. Help!'
    },
    {
      room: 'master_bedroom',
      text: 'The "clothes chair" has taken over my bedroom again.'
    }
  ];

  const handleAskGemini = async (promptText?: string) => {
    const textToSubmit = promptText || questionInput;
    if (!textToSubmit.trim() || isLoadingGemini) return;

    audioEngine.playPopSound();
    setIsLoadingGemini(true);

    const roomObj = rooms.find(r => r.id === selectedRoomContext);
    const roomName = roomObj ? roomObj.name : 'General Home';

    // If running from file:// or without HTTP server, use local AuDHD advice immediately
    if (typeof window !== 'undefined' && !window.location.protocol.startsWith('http')) {
      setTimeout(() => {
        const localAnswer = getOfflineAuDHDAdvice(roomName, textToSubmit);
        setGeminiAdviceList(prev => [
          {
            id: Date.now().toString(),
            room: roomName,
            question: textToSubmit,
            answer: localAnswer,
            timestamp: 'Just now (Portable Mode)'
          },
          ...prev
        ]);
        setQuestionInput('');
        setActiveTab('gemini');
        setIsLoadingGemini(false);
      }, 300);
      return;
    }

    try {
      const response = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: roomName,
          question: textToSubmit,
          currentTasks: roomObj ? roomObj.tasks.map(t => t.title) : []
        })
      });

      const data = await response.json();
      const answer = data.answer || data.fallbackAnswer || getOfflineAuDHDAdvice(roomName, textToSubmit);

      setGeminiAdviceList(prev => [
        {
          id: Date.now().toString(),
          room: roomName,
          question: textToSubmit,
          answer,
          timestamp: 'Just now'
        },
        ...prev
      ]);

      setQuestionInput('');
      setActiveTab('gemini');
    } catch (err) {
      console.warn('Backend unavailable, using local AuDHD advice:', err);
      const offlineAnswer = getOfflineAuDHDAdvice(roomName, textToSubmit);
      setGeminiAdviceList(prev => [
        {
          id: Date.now().toString(),
          room: roomName,
          question: textToSubmit,
          answer: offlineAnswer,
          timestamp: 'Just now (Offline Coach)'
        },
        ...prev
      ]);
      setQuestionInput('');
      setActiveTab('gemini');
    } finally {
      setIsLoadingGemini(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight text-white font-sans">
                    AuDHD Strategy Lab & Declutter Guide
                  </h2>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white border border-white/20">
                    Gemini AI Powered
                  </span>
                </div>
                <p className="text-xs text-purple-100 font-medium mt-0.5">
                  Scientifically proven organizing principles tailored for ADHD & autistic neurology.
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

          {/* Nav Tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => {
                audioEngine.playPopSound();
                setActiveTab('tips');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'tips'
                  ? 'bg-white text-purple-900 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Proven ADHD Frameworks</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playPopSound();
                setActiveTab('gemini');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gemini'
                  ? 'bg-white text-purple-900 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ask Gemini AI Coach</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {activeTab === 'tips' ? (
            <div className="space-y-6">
              
              {/* Room Specific Highlight Callouts */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-200">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-900 block mb-2">
                  Key Room Tips (Quick Select):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {rooms.map(room => (
                    <div key={room.id} className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                      <div className="font-bold text-slate-900 flex items-center justify-between mb-1">
                        <span>{room.name}</span>
                        <button
                          onClick={() => {
                            setSelectedRoomContext(room.id);
                            setActiveTab('gemini');
                          }}
                          className="text-[10px] text-purple-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          Ask Gemini <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {room.declutterTips[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research-backed ADHD frameworks */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>Foundational Neurodivergent Organizing Frameworks</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ADHD_ORGANIZING_STRATEGIES.map(strat => (
                    <div
                      key={strat.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            {strat.badge}
                          </span>
                        </div>
                        <h4 className="font-black text-sm text-slate-900 mb-1">
                          {strat.title}
                        </h4>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {strat.summary}
                        </p>
                        
                        <div className="p-3 bg-slate-50 rounded-xl mb-3 text-[11px] text-slate-700 border border-slate-100">
                          <span className="font-bold text-purple-900">Why it works for AuDHD: </span>
                          <span>{strat.whyItWorks}</span>
                        </div>
                      </div>

                      <div className="space-y-1 border-t border-slate-100 pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Immediate Action Steps:
                        </span>
                        {strat.actionableSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Gemini Coach View */
            <div className="space-y-6">

              {/* Input Form */}
              <div className="p-5 bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl border-2 border-purple-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-black text-slate-900">
                      Ask Gemini for Shame-Free Organizing Feedback
                    </span>
                  </div>
                  
                  {/* Room Selector */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-500">Room:</span>
                    <select
                      value={selectedRoomContext}
                      onChange={e => setSelectedRoomContext(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                    >
                      <option value="general">Entire House / General</option>
                      {rooms.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Question Chips */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Click a quick scenario to ask Gemini:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedRoomContext(q.room);
                          handleAskGemini(q.text);
                        }}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-purple-900 hover:bg-purple-100 transition-colors text-left cursor-pointer"
                      >
                        ⚡ {q.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={questionInput}
                    onChange={e => setQuestionInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAskGemini()}
                    placeholder="E.g., How do I organize my 4-tier storage shelf or tackle laser cutter soot?"
                    className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={() => handleAskGemini()}
                    disabled={isLoadingGemini || !questionInput.trim()}
                    className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    {isLoadingGemini ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Ask</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Gemini Answers History */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Advice & Strategies from Gemini:
                </h3>

                {geminiAdviceList.map(item => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {item.room}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          "{item.question}"
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.timestamp}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal bg-purple-50/40 p-3.5 rounded-xl border border-purple-100">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            💡 AuDHD Rule: You are not lazy, you just need lower friction.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Close Lab
          </button>
        </div>

      </div>
    </div>
  );
};
