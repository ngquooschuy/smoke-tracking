import { IAppState } from '../models/app-state.model.ts';
import { IActivityDay } from '../models/heatmap.model.ts';
import { HeatmapLevel } from '../enums/heatmap.enum.ts';
import { INITIAL_QUESTS } from './quest.constants.ts';

export function generateInitialActivityCalendar(): IActivityDay[] {
  const today = new Date();
  const dayNames = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dateStr = today.toISOString().split('T')[0];

  return [
    {
      date: dateStr,
      count: 0,
      level: HeatmapLevel.CLEAN,
      dayName: dayNames[today.getDay()],
      fullDayName: `${dayNames[today.getDay()]}, ${today.getDate()}/${today.getMonth() + 1}`,
      isToday: true,
      isFuture: false
    }
  ];
}

export const DEFAULT_APP_STATE: IAppState = {
  startTime: Date.now(),
  todayCount: 0,
  cravingsResisted: 0,
  config: {
    costPerPack: 35000,
    cigsPerPack: 20,
    cigsPerDayOld: 15,
    soundEnabled: true,
    hapticsEnabled: true,
    nickname: 'HIỆP SĨ PHỔI'
  },
  expBonus: 0,
  quests: INITIAL_QUESTS.map((q) => ({ ...q, completed: false, claimed: false })),
  relapses: [],
  activityCalendar: generateInitialActivityCalendar()
};

