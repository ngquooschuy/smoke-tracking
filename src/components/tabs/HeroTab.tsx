import React from 'react';
import { IRankProgress } from '../../models/hero.model.ts';
import { INITIAL_BADGES } from '../../constants/rank.constants.ts';

interface HeroTabProps {
  nickname: string;
  rank: IRankProgress;
  moneySaved: number;
  cigsAvoided: number;
  cravingsResisted: number;
  totalSmoked: number;
}

export const HeroTab: React.FC<HeroTabProps> = ({
  nickname,
  rank,
  moneySaved,
  cigsAvoided,
  cravingsResisted,
  totalSmoked
}) => {
  const formatMoney = (num: number) => num.toLocaleString('vi-VN');

  // Rule: Mỗi 1 điếu đã hút giảm 10% máu
  const hp = Math.max(0, 100 - totalSmoked * 10);
  const hpSegments = 10;
  const filledSegments = Math.ceil(hp / 10);

  let statusText = 'Phổi Khỏe Mạnh • 100% Sinh Lực';
  let statusColor = 'text-primary-container';
  if (hp <= 30) {
    statusText = 'Cảnh Báo: Sinh Lực Suy Kiệt!';
    statusColor = 'text-error';
  } else if (hp <= 70) {
    statusText = 'Tổn Thương: Cần Hồi Phục Gấp';
    statusColor = 'text-lemon-shock';
  }

  return (
    <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-5 space-y-5">
      {/* Hero Profile Header */}
      <div className="flex items-center gap-4 border-b-2 border-pixel-black pb-4">
        <div className="w-16 h-16 bg-pixel-black border-2 border-primary-container flex items-center justify-center pixel-shadow-sm flex-shrink-0">
          <span className="material-symbols-outlined text-4xl text-lemon-shock">person</span>
        </div>
        <div className="flex-1">
          <h2 className="font-display-lg text-lg text-lemon-shock uppercase font-bold">{nickname}</h2>
          <div className="text-xs text-primary-container font-bold">
            {rank.currentRank.tier} • {rank.currentRank.title}
          </div>
          <div className={`text-xs font-bold mt-0.5 ${statusColor}`}>
            Trạng thái: {statusText}
          </div>
        </div>
      </div>

      {/* HP Bar (Mỗi điếu -10% Máu) */}
      <div className="bg-surface border-3 border-pixel-black pixel-shadow-sm p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-display-lg text-sm text-on-surface uppercase font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-error">favorite</span>
            SINH LỰC PHỔI (HP)
          </span>
          <span className={`font-display-lg text-base font-bold ${hp < 30 ? 'text-error' : hp < 70 ? 'text-lemon-shock' : 'text-primary-container'}`}>
            {hp} / 100%
          </span>
        </div>

        {/* 10 Discrete HP Segments */}
        <div className="h-7 w-full border-2 border-pixel-black bg-surface-bright p-1 flex gap-1">
          {Array.from({ length: hpSegments }).map((_, i) => {
            const isFilled = i < filledSegments;
            let bg = 'bg-surface';
            if (isFilled) {
              if (hp <= 30) bg = 'bg-error animate-pulse';
              else if (hp <= 60) bg = 'bg-lemon-shock';
              else bg = 'bg-primary-container';
            }
            return (
              <div
                key={`hero_hp_seg_${i}`}
                className={`h-full flex-1 transition-all duration-300 ${bg}`}
                title={`Khúc ${i + 1}: 10% HP`}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
          <span>Quy tắc: Mỗi 1 điếu hút = -10% HP</span>
          <span className="text-error font-bold">Đã trừ: -{totalSmoked * 10}%</span>
        </div>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Smoked Count */}
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase font-bold">Tổng Điếu Đã Hút</span>
          <span className="font-display-lg text-xl md:text-2xl text-error font-bold block mt-1">
            {totalSmoked} <span className="text-xs text-on-surface">Điếu</span>
          </span>
        </div>

        {/* Cravings Resisted */}
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase font-bold">Cơn Thèm Đã Diệt</span>
          <span className="font-display-lg text-xl md:text-2xl text-lemon-shock font-bold block mt-1">
            {cravingsResisted} <span className="text-xs text-on-surface">Lần</span>
          </span>
        </div>

        {/* Money Saved */}
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase font-bold">Tiền Tiết Kiệm</span>
          <span className="font-display-lg text-base md:text-lg text-secondary-container font-bold block mt-1">
            +{formatMoney(moneySaved)} đ
          </span>
        </div>

        {/* Cigarettes Avoided */}
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase font-bold">Điếu Đã Né</span>
          <span className="font-display-lg text-base md:text-lg text-primary-container font-bold block mt-1">
            {cigsAvoided} Điếu
          </span>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div>
        <h3 className="font-display-lg text-sm text-on-surface uppercase font-bold mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">military_tech</span>
          HUY HIỆU THÀNH TÍCH
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {INITIAL_BADGES.map((badge) => {
            const isUnlocked = badge.unlocked;
            return (
              <div
                key={badge.id}
                className={`p-2 border-2 ${
                  isUnlocked
                    ? 'border-primary-container bg-surface-container pixel-shadow-sm'
                    : 'border-pixel-black bg-surface opacity-50'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-2xl ${
                    isUnlocked ? 'text-primary-container' : 'text-on-surface-variant'
                  }`}
                >
                  {badge.icon}
                </span>
                <span className="text-[10px] block font-bold text-on-surface mt-1 truncate">
                  {badge.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
