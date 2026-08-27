import { HeatmapLevel } from '../enums/heatmap.enum.ts';

export interface IActivityDay {
  date: string; // YYYY-MM-DD
  count: number; // Cigarettes smoked
  level: HeatmapLevel; // 0..3
  dayName?: string;
  fullDayName?: string;
  isToday?: boolean;
  isFuture?: boolean;
}

export interface IHeatmapStats {
  perfectDays: number;
  totalLoggedDays: number;
  currentStreak: number;
  cleanRate: number;
}
