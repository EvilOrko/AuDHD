export interface CleaningTask {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number; // default 15
  station?: string; // e.g. for craft room: 'laser', '3d_printing', 'vinyl_cutter', 'computer_desk', 'storage_shelf', 'closet'
  completed: boolean;
  completedAt?: string;
  sensoryTip?: string; // AuDHD friendly tip for this task
  microSteps?: string[];
}

export interface QuickTidyTask {
  id: string;
  roomId: string;
  roomName: string;
  title: string;
  minutes: number; // 3 to 10 minutes
  impact: 'high' | 'critical' | 'moderate';
  completed: boolean;
  visitorTarget: string; // why this matters for unexpected guests
}

export interface Room {
  id: string;
  name: string;
  subtitle: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    gradient: string;
    lightBg: string;
    badgeBg: string;
  };
  iconName: string;
  tasks: CleaningTask[];
  stations?: {
    id: string;
    name: string;
    description: string;
    badgeColor: string;
  }[];
  quickTidyTasks: QuickTidyTask[];
  declutterTips: string[];
}

export type FocusTrackId =
  | 'lofi'
  | 'brown_noise'
  | 'pink_noise'
  | 'ambient_432'
  | 'chiptune'
  | 'binaural_alpha'
  | 'mute';

export interface FocusTrackInfo {
  id: FocusTrackId;
  name: string;
  description: string;
  tag: string;
  icon: string;
}

export interface GeminiTipMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
