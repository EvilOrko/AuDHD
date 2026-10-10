import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Plus, 
  Zap, 
  BookOpen, 
  Clock, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  Check
} from 'lucide-react';
import { Room, CleaningTask } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
  onStartTask: (task: CleaningTask) => void;
  onToggleTaskComplete: (roomId: string, taskId: string) => void;
  onAddTask: (roomId: string, task: Omit<CleaningTask, 'id' | 'completed'>) => void;
  onOpenQuickTidy: (roomId: string) => void;
  onOpenTips: (roomId: string) => void;
}

export const RoomDetail: React.FC<RoomDetailProps> = ({
  room,
  onBack,
  onStartTask,
  onToggleTaskComplete,
  onAddTask,
  onOpenQuickTidy,
  onOpenTips,
}) => {
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskStation, setNewTaskStation] = useState<string>(room.stations?.[0]?.id || '');
  const [expandedTaskIds, setExpandedTaskIds] = useState<Record<string, boolean>>({});

  const completedCount = room.tasks.filter(t => t.completed).length;
  const totalCount = room.tasks.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTasks = stationFilter === 'all'
    ? room.tasks
    : room.tasks.filter(t => t.station === stationFilter);

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTaskIds(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    audioEngine.playPopSound();
    onAddTask(room.id, {
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || '15-minute focused cleaning sprint',
      estimatedMinutes: 15,
      station: newTaskStation || undefined,
      sensoryTip: 'Keep your focus playlist playing and remember: any progress counts!',
      microSteps: ['Set up tools & gloves', 'Tackle the main area', 'Tidy the perimeter']
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddTaskForm(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Rooms</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenQuickTidy(room.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Quick Tidy ({room.quickTidyTasks.length})</span>
          </button>
          <button
            onClick={() => onOpenTips(room.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Room Tips</span>
          </button>
        </div>
      </div>

      {/* Room Hero Card */}
      <div className={`p-8 rounded-3xl bg-gradient-to-r ${room.colorTheme.gradient} text-white shadow-lg relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md uppercase tracking-wider text-white border border-white/25">
                Active Zone
              </span>
              <span className="text-xs font-bold text-white/90">
                15-Minute Blocks • Sensory Friendly
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
              {room.name}
            </h1>
            <p className="text-sm font-medium text-white/90 mt-1 max-w-xl">
              {room.subtitle}
            </p>
          </div>

          {/* Progress Ring Widget */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 flex items-center gap-4 shrink-0">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-white/80">Room Completion</p>
              <p className="text-2xl font-black text-white">{percentComplete}%</p>
              <p className="text-xs text-white/80">{completedCount} of {totalCount} Sprints Done</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center relative">
              <span className="text-xs font-black text-white">{completedCount}/{totalCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stations Filter (especially valuable for Craft Room!) */}
      {room.stations && room.stations.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Filter by Maker Station / Zone:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStationFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stationFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Stations ({room.tasks.length})
            </button>
            {room.stations.map(st => {
              const stationTaskCount = room.tasks.filter(t => t.station === st.id).length;
              return (
                <button
                  key={st.id}
                  onClick={() => setStationFilter(st.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    stationFilter === st.id
                      ? `${st.badgeColor} border-current font-black shadow-xs ring-2 ring-purple-400/40`
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {st.name} ({stationTaskCount})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Task List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-sans">
          <span>15-Minute Task Blocks</span>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {filteredTasks.length} Available
          </span>
        </h2>

        <button
          onClick={() => setShowAddTaskForm(!showAddTaskForm)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs hover:bg-purple-100 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* Add Task Drawer */}
      {showAddTaskForm && (
        <form onSubmit={handleCreateTask} className="p-5 rounded-2xl bg-white border-2 border-purple-200 shadow-md space-y-3 animate-in fade-in duration-150">
          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Add a 15-Minute Task to {room.name}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Task Title (e.g. Wipe acrylic scrap caddy)"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              required
            />
            {room.stations && (
              <select
                value={newTaskStation}
                onChange={e => setNewTaskStation(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              >
                <option value="">No specific station</option>
                {room.stations.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            )}
          </div>
          <input
            type="text"
            placeholder="Short description or specific focus note"
            value={newTaskDesc}
            onChange={e => setNewTaskDesc(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddTaskForm(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shadow-xs"
            >
              Save 15m Task
            </button>
          </div>
        </form>
      )}

      {/* Task Cards Grid */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const isExpanded = !!expandedTaskIds[task.id];
          const stationObj = room.stations?.find(s => s.id === task.station);

          return (
            <div
              key={task.id}
              className={`p-5 rounded-3xl border-2 transition-all duration-200 bg-white ${
                task.completed
                  ? 'border-emerald-200/80 bg-emerald-50/20'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Task Information */}
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Manual Complete Checkbox */}
                  <button
                    onClick={() => {
                      audioEngine.playPopSound();
                      onToggleTaskComplete(room.id, task.id);
                    }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'border-slate-300 bg-slate-50 hover:border-purple-400'
                    }`}
                    title={task.completed ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-base font-black tracking-tight ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}>
                        {task.title}
                      </span>

                      {/* Station Badge if applicable */}
                      {stationObj && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${stationObj.badgeColor}`}>
                          {stationObj.name}
                        </span>
                      )}

                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.estimatedMinutes} min
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      {task.description}
                    </p>

                    {/* Quick Sensory Tip Callout */}
                    {task.sensoryTip && (
                      <div className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-200/60 inline-flex items-center gap-1.5 mt-1">
                        <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{task.sensoryTip}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action: Big Start Task Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onStartTask(task)}
                    className="flex-1 sm:flex-initial py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white font-black text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Begin Sprint</span>
                  </button>

                  {task.microSteps && (
                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title="Toggle micro-steps"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>

              </div>

              {/* Collapsible Micro-steps */}
              {isExpanded && task.microSteps && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 bg-slate-50/70 p-4 rounded-2xl">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Micro-Steps Breakdown (Low Working Memory Load):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {task.microSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200/70 text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
            <Sparkles className="w-10 h-10 text-purple-400 mx-auto" />
            <h3 className="font-bold text-slate-700">No tasks in this station filter</h3>
            <button
              onClick={() => setStationFilter('all')}
              className="text-xs text-purple-600 font-bold hover:underline cursor-pointer"
            >
              Show all station tasks
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
