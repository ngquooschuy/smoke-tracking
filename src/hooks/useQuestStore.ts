import { useState, useEffect, useCallback } from 'react';
import { IAppState } from '../models/app-state.model.ts';
import { ITimeElapsed } from '../models/smoke-log.model.ts';
import { IRankProgress } from '../models/hero.model.ts';
import { IHeatmapStats } from '../models/heatmap.model.ts';
import { StorageService } from '../services/storage.service.ts';
import { ApiService } from '../services/api.service.ts';
import { audioService } from '../services/audio.service.ts';
import { DEFAULT_APP_STATE, generateInitialActivityCalendar } from '../constants/app.constants.ts';
import { SmokingReason } from '../enums/reason.enum.ts';
import { HeatmapLevel } from '../enums/heatmap.enum.ts';

export function useQuestStore() {
  const [state, setState] = useState<IAppState>(() => StorageService.loadState());
  const [timeElapsed, setTimeElapsed] = useState<ITimeElapsed>(() =>
    StorageService.getTimeElapsed(state.startTime)
  );

  // Fetch initial state from MongoDB API via Axios
  useEffect(() => {
    let isMounted = true;
    ApiService.getState()
      .then((serverState) => {
        if (isMounted && serverState) {
          setState((prev) => ({
            ...prev,
            ...serverState,
            config: { ...prev.config, ...(serverState.config || {}) }
          }));
        }
      })
      .catch((err) => {
        console.warn('Backend API unavailable, using offline local state:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Save state to localStorage & sync sound settings on state changes
  useEffect(() => {
    StorageService.saveState(state);
    audioService.enabled = state.config.soundEnabled;
  }, [state]);

  // Real-time 1s timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(StorageService.getTimeElapsed(state.startTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime]);

  // Haptic feedback helper
  const triggerHaptic = useCallback((pattern: number[] = [15]) => {
    if (state.config.hapticsEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }, [state.config.hapticsEnabled]);

  // Record smoke / relapse
  const recordSmoke = useCallback((reason: SmokingReason | string = SmokingReason.STRESS) => {
    audioService.hit();
    triggerHaptic([40, 80, 40]);

    // Optimistic UI update
    setState((prev) => {
      const newTodayCount = prev.todayCount + 1;
      const todayDateStr = new Date().toISOString().split('T')[0];

      const updatedCalendar = (prev.activityCalendar || []).map((day) => {
        if (day.date === todayDateStr || day.isToday) {
          let lvl = HeatmapLevel.CLEAN;
          if (newTodayCount === 1) lvl = HeatmapLevel.LIGHT;
          else if (newTodayCount <= 3) lvl = HeatmapLevel.MODERATE;
          else lvl = HeatmapLevel.HEAVY;

          return { ...day, count: newTodayCount, level: lvl };
        }
        return day;
      });

      return {
        ...prev,
        startTime: Date.now(),
        todayCount: newTodayCount,
        activityCalendar: updatedCalendar,
        relapses: [
          ...prev.relapses,
          {
            id: `r_${Date.now()}`,
            time: new Date().toISOString(),
            reason
          }
        ]
      };
    });

    // Sync with MongoDB API
    ApiService.recordSmoke(reason)
      .then((serverState) => {
        if (serverState) setState(serverState);
      })
      .catch((err) => console.warn('Sync recordSmoke to API failed:', err.message));
  }, [triggerHaptic]);

  // Craving Resisted (SOS mode complete)
  const recordCravingResisted = useCallback(() => {
    audioService.levelUp();
    triggerHaptic([30, 60, 90]);

    // Optimistic UI update
    setState((prev) => {
      const updatedQuests = (prev.quests || []).map((q) =>
        q.id === 'q2' ? { ...q, completed: true } : q
      );
      return {
        ...prev,
        cravingsResisted: prev.cravingsResisted + 1,
        expBonus: prev.expBonus + 10000,
        quests: updatedQuests
      };
    });

    // Sync with MongoDB API
    ApiService.recordCravingResisted()
      .then((serverState) => {
        if (serverState) setState(serverState);
      })
      .catch((err) => console.warn('Sync recordCravingResisted to API failed:', err.message));
  }, [triggerHaptic]);

  // Claim Quest reward
  const claimQuest = useCallback((questId: string) => {
    audioService.coin();
    triggerHaptic([20, 50, 20]);

    // Optimistic UI update
    setState((prev) => {
      const targetQuest = (prev.quests || []).find((q) => q.id === questId);
      if (!targetQuest || !targetQuest.completed || targetQuest.claimed) return prev;

      const updatedQuests = (prev.quests || []).map((q) =>
        q.id === questId ? { ...q, claimed: true } : q
      );
      return {
        ...prev,
        expBonus: prev.expBonus + targetQuest.exp,
        quests: updatedQuests
      };
    });

    // Sync with MongoDB API
    ApiService.claimQuest(questId)
      .then((serverState) => {
        if (serverState) setState(serverState);
      })
      .catch((err) => console.warn('Sync claimQuest to API failed:', err.message));
  }, [triggerHaptic]);

  // Update Config
  const updateConfig = useCallback((newConfig: Partial<IAppState['config']>) => {
    // Optimistic UI update
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...newConfig }
    }));

    // Sync with MongoDB API
    ApiService.updateConfig(newConfig)
      .catch((err) => console.warn('Sync updateConfig to API failed:', err.message));
  }, []);

  // Reset all data
  const resetAll = useCallback(() => {
    audioService.hit();
    const fresh: IAppState = {
      ...DEFAULT_APP_STATE,
      startTime: Date.now(),
      todayCount: 0,
      expBonus: 0,
      activityCalendar: generateInitialActivityCalendar()
    };
    setState(fresh);

    // Sync with MongoDB API
    ApiService.resetState()
      .then((serverState) => {
        if (serverState) setState(serverState);
      })
      .catch((err) => console.warn('Sync resetState to API failed:', err.message));
  }, []);

  // Calculated properties
  const moneySaved: number = StorageService.getMoneySaved(state);
  const cigsAvoided: number = StorageService.getCigarettesAvoided(state);
  const hp: number = StorageService.getLungHealth(state);
  const rank: IRankProgress = StorageService.getRank(moneySaved);
  const heatmapStats: IHeatmapStats = StorageService.getHeatmapStats(state.activityCalendar);

  return {
    state,
    timeElapsed,
    moneySaved,
    cigsAvoided,
    hp,
    rank,
    heatmapStats,
    recordSmoke,
    recordCravingResisted,
    claimQuest,
    updateConfig,
    resetAll,
    triggerHaptic
  };
}
