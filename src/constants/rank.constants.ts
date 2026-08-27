import { RankTier, RankTitle } from '../enums/rank.enum.ts';
import { IRankDefinition, IAchievementBadge } from '../models/hero.model.ts';
import { THEME_COLORS } from './theme.constants.ts';

export const RANK_LADDER: IRankDefinition[] = [
  {
    min: 0,
    title: RankTitle.NOVICE,
    tier: RankTier.LVL_1,
    badge: 'egg',
    color: THEME_COLORS.error
  },
  {
    min: 50000,
    title: RankTitle.WARRIOR,
    tier: RankTier.LVL_2,
    badge: 'shield',
    color: THEME_COLORS.lemonShock
  },
  {
    min: 150000,
    title: RankTitle.KNIGHT,
    tier: RankTier.LVL_3,
    badge: 'swords',
    color: THEME_COLORS.primaryContainer
  },
  {
    min: 300000,
    title: RankTitle.MASTER,
    tier: RankTier.LVL_4,
    badge: 'military_tech',
    color: THEME_COLORS.secondary
  },
  {
    min: 600000,
    title: RankTitle.GRANDMASTER,
    tier: RankTier.LVL_5,
    badge: 'workspace_premium',
    color: '#ffd7f5'
  },
  {
    min: 1200000,
    title: RankTitle.LEGEND,
    tier: RankTier.MAX,
    badge: 'crown',
    color: THEME_COLORS.secondaryContainer
  }
];

export const INITIAL_BADGES: IAchievementBadge[] = [
  {
    id: 'b1',
    title: '24H Đầu',
    sub: 'Vượt ải 24h',
    icon: 'timer',
    unlocked: true
  },
  {
    id: 'b2',
    title: '100k Heo',
    sub: 'Tiết kiệm 100k',
    icon: 'savings',
    unlocked: true
  },
  {
    id: 'b3',
    title: 'Khắc Cơn',
    sub: '3 lần SOS thành công',
    icon: 'shield',
    unlocked: true
  },
  {
    id: 'b4',
    title: '7 Ngày',
    sub: '1 tuần sạch khói',
    icon: 'hotel_class',
    unlocked: false
  }
];
