import { IAppState } from '../models/app-state.model.ts';
import { IActivityDay } from '../models/heatmap.model.ts';
import { HeatmapLevel } from '../enums/heatmap.enum.ts';
import { INITIAL_QUESTS } from './quest.constants.ts';

export const APP_STORAGE_KEY = 'SMOKE_QUEST_DATA_V3_REACT_TS';

// Generate realistic GitHub-style activity calendar (last 60 days up to today)
export function generateInitialActivityCalendar(): IActivityDay[] {
  const days: IActivityDay[] = [];
  const today = new Date();
  const dayNames = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  // Past sample sequence leading to current smoke-free streak
  const sampleCounts = [
    5, 4, 6, 3, 5, 4, 2, 3, 2, 4, 1, 3, 2, 0, 2, 1, 1, 0, 2, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  for (let i = 59; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = (i === 0);

    const count = isToday ? 0 : (sampleCounts[59 - i] ?? 0);

    let level = HeatmapLevel.CLEAN;
    if (count === 0) level = HeatmapLevel.CLEAN;
    else if (count === 1) level = HeatmapLevel.LIGHT;
    else if (count <= 3) level = HeatmapLevel.MODERATE;
    else level = HeatmapLevel.HEAVY;

    days.push({
      date: dateStr,
      count,
      level,
      dayName: dayNames[d.getDay()],
      fullDayName: `${dayNames[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`,
      isToday,
      isFuture: false
    });
  }

  return days;
}

export const DEFAULT_APP_STATE: IAppState = {
  startTime: Date.now() - (3 * 86400 + 14 * 3600 + 42 * 60 + 59) * 1000,
  todayCount: 0,
  cravingsResisted: 3,
  config: {
    costPerPack: 35000,
    cigsPerPack: 20,
    cigsPerDayOld: 15,
    soundEnabled: true,
    hapticsEnabled: true,
    nickname: 'HIỆP SĨ PHỔI'
  },
  expBonus: 150000,
  quests: INITIAL_QUESTS,
  relapses: [],
  activityCalendar: generateInitialActivityCalendar()
};
