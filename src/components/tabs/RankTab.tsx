import React from 'react';
import { IRankProgress } from '../../models/hero.model.ts';
import { RANK_LADDER } from '../../constants/rank.constants.ts';

interface RankTabProps {
  rank: IRankProgress;
}

export const RankTab: React.FC<RankTabProps> = ({ rank }) => {
  const formatMoney = (num: number) => num.toLocaleString('vi-VN');

  const nextThreshold = rank.nextRank ? formatMoney(rank.nextRank.min) : 'MAX';
  const progressText = rank.nextRank
    ? `Tổng tích lũy: +${formatMoney(rank.totalMoney)} đ / ${nextThreshold} đ lên ${rank.nextRank.title}`
    : `ĐÃ ĐẠT CẤP ĐỘ CAO NHẤT! (${formatMoney(rank.totalMoney)} đ)`;

  return (
    <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-5 space-y-4">
      <div className="flex items-center justify-between border-b-2 border-pixel-black pb-2">
        <h2 className="font-display-lg text-lg text-secondary-container uppercase font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">leaderboard</span>
          BẢNG CẤP BẬC HIỆP SĨ
        </h2>
        <span className="text-xs bg-primary-container text-pixel-black px-2 py-1 font-bold border border-pixel-black">
          {rank.currentRank.tier}
        </span>
      </div>

      {/* Current Rank Showcase */}
      <div className="bg-pixel-black border-2 border-pixel-black p-4 text-center">
        <span className="text-xs text-on-surface-variant uppercase block">Cấp bậc hiện tại</span>
        <h3 className="font-display-lg text-xl text-lemon-shock font-bold tracking-widest mt-1">
          {rank.currentRank.title}
        </h3>
        <p className="text-xs text-primary-container mt-2 font-mono">{progressText}</p>
      </div>

      {/* Rank Ladder */}
      <div className="space-y-2">
        {RANK_LADDER.map((item, idx) => {
          const isCurrent = rank.currentRank.tier === item.tier;
          const isPassed = rank.totalMoney >= item.min;

          let containerClass = 'border-2 border-pixel-black bg-surface opacity-60';
          let badgeText = 'KHÓA';
          let badgeClass = 'text-xs text-on-surface-variant';

          if (isCurrent) {
            containerClass = 'border-2 border-primary-container bg-surface-container pixel-shadow-sm';
            badgeText = 'ACTIVE';
            badgeClass = 'text-xs bg-primary-container text-pixel-black px-2 py-0.5 font-bold';
          } else if (isPassed) {
            containerClass = 'border-2 border-pixel-black bg-surface opacity-90';
            badgeText = 'ĐẠT';
            badgeClass = 'text-xs text-primary-container font-bold';
          }

          return (
            <div key={item.tier} className={`p-3 flex items-center justify-between transition-all ${containerClass}`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl" style={{ color: item.color }}>
                  {item.badge}
                </span>
                <div>
                  <div className={`font-bold text-sm ${isCurrent ? 'text-primary-container' : 'text-on-surface'}`}>
                    {idx + 1}. {item.title} {isCurrent && '(HIỆN TẠI)'}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Yêu cầu: Tiết kiệm &gt; {formatMoney(item.min)} đ
                  </div>
                </div>
              </div>
              <span className={badgeClass}>{badgeText}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
