import React from 'react';
import { IRankProgress } from '../../models/hero.model.ts';
import { INITIAL_BADGES } from '../../constants/rank.constants.ts';

interface HeroTabProps {
  nickname: string;
  rank: IRankProgress;
  moneySaved: number;
  cigsAvoided: number;
  cravingsResisted: number;
  hp: number;
}

export const HeroTab: React.FC<HeroTabProps> = ({
  nickname,
  rank,
  moneySaved,
  cigsAvoided,
  cravingsResisted,
  hp
}) => {
  const formatMoney = (num: number) => num.toLocaleString('vi-VN');

  return (
    <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-5 space-y-4">
      {/* Hero Header Card */}
      <div className="flex items-center gap-4 border-b-2 border-pixel-black pb-4">
        <div className="w-16 h-16 bg-pixel-black border-2 border-primary-container flex items-center justify-center pixel-shadow-sm flex-shrink-0">
          <span className="material-symbols-outlined text-4xl text-lemon-shock">person</span>
        </div>
        <div>
          <h2 className="font-display-lg text-lg text-lemon-shock uppercase font-bold">{nickname}</h2>
          <div className="text-xs text-primary-container font-bold">
            {rank.currentRank.tier} • {rank.currentRank.title}
          </div>
          <div className="text-xs text-on-surface-variant mt-0.5">Trạng thái: Khỏe mạnh • Tự do</div>
        </div>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase">Tiền Tiết Kiệm</span>
          <span className="font-display-lg text-base md:text-lg text-secondary-container font-bold block mt-1">
            +{formatMoney(moneySaved)} đ
          </span>
        </div>
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase">Điếu Đã Né</span>
          <span className="font-display-lg text-base md:text-lg text-primary-container font-bold block mt-1">
            {cigsAvoided} Điếu
          </span>
        </div>
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase">Cơn Thèm Đã Diệt</span>
          <span className="font-display-lg text-base md:text-lg text-lemon-shock font-bold block mt-1">
            {cravingsResisted} Lần
          </span>
        </div>
        <div className="bg-surface border-2 border-pixel-black p-3 text-center pixel-shadow-sm">
          <span className="text-xs text-on-surface-variant block uppercase">HP Phổi Phục Hồi</span>
          <span className="font-display-lg text-base md:text-lg text-primary-container font-bold block mt-1">
            {hp}%
          </span>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div>
        <h3 className="font-display-lg text-sm text-on-surface uppercase font-bold mb-3 flex items-center gap-1">
          <span className="material-symbols-outlined text-base">military_tech</span>
          HUY HIỆU THÀNH TÍCH ĐẠT ĐƯỢC
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
