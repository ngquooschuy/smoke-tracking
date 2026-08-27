import { RankTier, RankTitle } from '../enums/rank.enum.ts';

export interface IRankDefinition {
  min: number;
  title: RankTitle;
  tier: RankTier;
  badge: string;
  color: string;
}

export interface IRankProgress {
  currentRank: IRankDefinition;
  nextRank: IRankDefinition | null;
  totalMoney: number;
}

export interface IAchievementBadge {
  id: string;
  title: string;
  sub: string;
  icon: string;
  unlocked: boolean;
}
