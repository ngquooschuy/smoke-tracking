import { IAppState } from '../models/app-state.model.ts';
import { ITimeElapsed } from '../models/smoke-log.model.ts';
import { IRankProgress } from '../models/hero.model.ts';
import { IActivityDay, IHeatmapStats } from '../models/heatmap.model.ts';
import { RANK_LADDER } from '../constants/rank.constants.ts';

export class StorageService {

  public static getTimeElapsed(startTime: number): ITimeElapsed {
    const diff = Math.max(0, Date.now() - startTime);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, totalSeconds };
  }

  public static getMoneySaved(state: IAppState): number {
    const { totalSeconds } = this.getTimeElapsed(state.startTime);
    const costPerCig = state.config.costPerPack / state.config.cigsPerPack;
    const cigsAvoidedRate = state.config.cigsPerDayOld / 86400;
    const baseSaved = totalSeconds * cigsAvoidedRate * costPerCig;
    return Math.round(baseSaved + (state.expBonus || 0));
  }

  public static getCigarettesAvoided(state: IAppState): number {
    const { totalSeconds } = this.getTimeElapsed(state.startTime);
    const rate = state.config.cigsPerDayOld / 86400;
    return Math.max(0, Math.floor(totalSeconds * rate));
  }

  public static getLungHealth(state: IAppState): number {
    const { days } = this.getTimeElapsed(state.startTime);
    let hp = 40 + days * 7 - (state.todayCount * 15);
    if (hp > 100) hp = 100;
    if (hp < 10) hp = 10;
    return hp;
  }

  public static getRank(moneySaved: number): IRankProgress {
    let currentRank = RANK_LADDER[0];
    let nextRank: typeof RANK_LADDER[0] | null = RANK_LADDER[1];

    for (let i = 0; i < RANK_LADDER.length; i++) {
      if (moneySaved >= RANK_LADDER[i].min) {
        currentRank = RANK_LADDER[i];
        nextRank = RANK_LADDER[i + 1] || null;
      }
    }

    return { currentRank, nextRank, totalMoney: moneySaved };
  }

  public static getHeatmapStats(calendar: IActivityDay[]): IHeatmapStats {
    let perfectDays = 0;
    let totalLoggedDays = 0;
    let currentStreak = 0;

    calendar.forEach((d) => {
      if (!d.isFuture && d.count !== null) {
        totalLoggedDays++;
        if (d.count === 0) perfectDays++;
      }
    });

    for (let i = calendar.length - 1; i >= 0; i--) {
      if (calendar[i].count === 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    const cleanRate = totalLoggedDays > 0 ? Math.round((perfectDays / totalLoggedDays) * 100) : 0;
    return { perfectDays, totalLoggedDays, currentStreak, cleanRate };
  }
}
