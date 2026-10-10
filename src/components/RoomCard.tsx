import React from 'react';
import { 
  Sparkles, 
  BedDouble, 
  Tv, 
  UtensilsCrossed, 
  Droplets, 
  Gamepad2, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onSelect: (roomId: string) => void;
  onQuickTidySelect: (roomId: string) => void;
  onOpenTips: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onSelect,
  onQuickTidySelect,
  onOpenTips,
}) => {
  const completedTasks = room.tasks.filter(t => t.completed).length;
  const totalTasks = room.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Icon mapping
  const renderIcon = () => {
    const props = { className: "w-8 h-8 text-white drop-shadow-xs" };
    switch (room.iconName) {
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'BedDouble':
        return <BedDouble {...props} />;
      case 'Tv':
        return <Tv {...props} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed {...props} />;
      case 'Droplets':
        return <Droplets {...props} />;
      case 'Gamepad2':
        return <Gamepad2 {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <div className="group relative rounded-3xl bg-white border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner & Room Header */}
      <div>
        <div className={`p-6 bg-gradient-to-br ${room.colorTheme.gradient} text-white relative overflow-hidden`}>
          {/* Subtle decorative background circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-black/10 blur-lg pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner group-hover:scale-105 transition-transform">
              {renderIcon()}
            </div>
            
            {/* Quick Badge */}
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-white/25 backdrop-blur-md text-white border border-white/30 shadow-xs">
                <Clock className="w-3 h-3" /> 15m Blocks
              </span>
              {completedTasks > 0 && (
                <span className="text-[11px] font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-full">
                  {completedTasks}/{totalTasks} Done
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 relative z-10">
            <h3 className="text-2xl font-black tracking-tight text-white font-sans drop-shadow-xs">
              {room.name}
            </h3>
            <p className="text-xs font-medium text-white/90 line-clamp-1 mt-0.5">
              {room.subtitle}
            </p>
          </div>
        </div>

        {/* Card Body & Specific Station Highlights */}
        <div className="p-6 space-y-4">
          
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
              <span>Cleaning Progress</span>
              <span className="text-slate-800">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`,
                  backgroundColor: room.colorTheme.accent 
                }}
              />
            </div>
          </div>

          {/* Specialized Stations (for Craft Room especially) */}
          {room.stations && room.stations.length > 0 && (
            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>6 Dedicated Stations:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {room.stations.map(st => (
                  <span 
                    key={st.id} 
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${st.badgeColor}`}
                  >
                    {st.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Sneak Peek */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Ready 15-Minute Tasks:
            </span>
            <ul className="space-y-1 text-xs text-slate-600 font-medium">
              {room.tasks.slice(0, 3).map(task => (
                <li key={task.id} className="flex items-center gap-2 truncate">
                  {task.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  )}
                  <span className={`truncate ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </span>
                </li>
              ))}
              {room.tasks.length > 3 && (
                <li className="text-[11px] text-slate-400 font-bold pl-4">
                  + {room.tasks.length - 3} more structured tasks
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Big Action Buttons */}
      <div className="p-6 pt-0 space-y-2">
        {/* Main Big Room Action Button */}
        <button
          onClick={() => onSelect(room.id)}
          className={`w-full py-4 px-5 rounded-2xl font-black text-base text-white shadow-md active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer group-hover:shadow-lg`}
          style={{ backgroundColor: room.colorTheme.accent }}
        >
          <span className="flex items-center gap-2">
            <span>Enter {room.name}</span>
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Secondary Fast Actions */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onQuickTidySelect(room.id)}
            className="py-2 px-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 font-bold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>⚡ Quick Tidy</span>
          </button>
          <button
            onClick={() => onOpenTips(room.id)}
            className="py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>💡 Room Tips</span>
          </button>
        </div>
      </div>

    </div>
  );
};
