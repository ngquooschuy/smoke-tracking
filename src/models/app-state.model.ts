import { IAppConfig } from './config.model.ts';
import { IQuest } from './quest.model.ts';
import { ISmokeLog } from './smoke-log.model.ts';
import { IActivityDay } from './heatmap.model.ts';

export interface IAppState {
  startTime: number;
  todayCount: number;
  cravingsResisted: number;
  config: IAppConfig;
  expBonus: number;
  quests: IQuest[];
  relapses: ISmokeLog[];
  activityCalendar: IActivityDay[];
}
