import React from 'react';
import { ITimeElapsed } from '../../models/smoke-log.model.ts';

interface StatsTabProps {
  todayCount: number;
  timeElapsed: ITimeElapsed;
  hp: number;
  moneySaved: number;
  onRecordSmoke: () => void;
  onOpenSos: () => void;
}

export const StatsTab: React.FC<StatsTabProps> = ({
  todayCount,
  timeElapsed,
  hp,
  moneySaved,
  onRecordSmoke,
  onOpenSos
}) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const timerStr = `${pad(timeElapsed.days)}:${pad(timeElapsed.hours)}:${pad(timeElapsed.minutes)}:${pad(timeElapsed.seconds)}`;

  // EXP Bar Percentage (capped at 100%)
  const expPercent = Math.min(100, Math.max(10, Math.round((moneySaved / 200000) * 100)));
  const expDisplay = moneySaved >= 1000 ? `+ ${Math.floor(moneySaved / 1000)}k Đ` : `+ ${moneySaved} Đ`;

  // 5 discrete HP segments
  const segments = 5;
  const filledSegments = Math.round((hp / 100) * segments);

  return (
    <div className="space-y-4">
      {/* Hero: Current Status */}
      <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none pixel-grid-bg"></div>
        <h2 className="font-display-lg text-lg md:text-xl text-on-surface-variant uppercase mb-2 relative z-10 font-bold tracking-wider">
          Sức Mạnh Hiện Tại
        </h2>
        <div className="flex items-end gap-3 mb-6 relative z-10">
          <span className="font-display-lg text-7xl md:text-8xl leading-none text-lemon-shock drop-shadow-[4px_4px_0_rgba(0,0,0,1)] font-bold">
            {todayCount}
          </span>
          <span className="font-body-lg text-on-surface text-sm md:text-base mb-3 uppercase tracking-wide">
            Điếu Hôm Nay
          </span>
        </div>

        {/* Arcade Button: Lên Cơn Vừa Hút */}
        <button
          onClick={onRecordSmoke}
          className="w-full py-4 border-4 border-pixel-black bg-primary-container text-pixel-black font-display-lg text-lg md:text-xl font-bold uppercase pixel-shadow active-press hover:bg-primary-fixed transition-colors flex items-center justify-center gap-3 relative z-10 group"
          type="button"
        >
          <span
            className="material-symbols-outlined text-3xl group-active:text-error transition-colors"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            heart_broken
          </span>
          Lên Cơn Vừa Hút!
        </button>
      </section>

      {/* Timer & Mini Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timer Box */}
        <div className="bg-surface border-4 border-pixel-black pixel-shadow p-4 flex flex-col justify-between">
          <h3 className="font-display-lg text-base text-primary-container uppercase mb-3 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-xl">timer</span>
            Thời Gian Không Khói
          </h3>
          <div className="bg-pixel-black border-2 border-primary-container p-4 text-center pixel-shadow-neon">
            <span className="font-body-lg text-xl md:text-2xl text-primary-container tracking-widest block font-bold">
              {timerStr}
            </span>
            <span className="font-label-md text-xs text-on-surface-variant uppercase mt-1 block tracking-wider">
              Ngày : Giờ : Phút : Giây
            </span>
          </div>
        </div>

        {/* HP & EXP Bars */}
        <div className="bg-surface border-4 border-pixel-black pixel-shadow p-4 flex flex-col justify-between gap-4">
          {/* HP (Phổi) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-display-lg text-sm md:text-base text-lemon-shock uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">favorite</span>
                HP (Phổi)
              </span>
              <span className="font-body-lg text-sm text-on-surface font-bold">{hp}/100</span>
            </div>
            <div className="h-6 w-full border-2 border-pixel-black bg-surface-bright p-0.5 flex gap-0.5">
              {Array.from({ length: segments }).map((_, i) => {
                const isFilled = i < filledSegments;
                let bg = 'bg-surface';
                if (isFilled) {
                  if (hp < 30) bg = 'bg-error';
                  else if (hp < 70) bg = i === 0 ? 'bg-error' : 'bg-lemon-shock';
                  else bg = 'bg-primary-container';
                }
                return <div key={`hp_seg_${i}`} className={`h-full flex-1 transition-colors ${bg}`} />;
              })}
            </div>
          </div>

          {/* EXP (Vàng) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-display-lg text-sm md:text-base text-secondary-container uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">monetization_on</span>
                EXP (Vàng)
              </span>
              <span className="font-body-lg text-sm text-on-surface font-bold">{expDisplay}</span>
            </div>
            <div className="h-6 w-full border-2 border-pixel-black bg-surface-bright p-0.5 flex gap-0.5">
              <div
                className="h-full bg-secondary-container transition-all duration-300"
                style={{ width: `${expPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOS Craving Emergency Button */}
      <button
        onClick={onOpenSos}
        className="w-full py-3 border-4 border-pixel-black bg-secondary text-pixel-black font-display-lg text-base font-bold uppercase pixel-shadow active-press hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2"
        type="button"
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          shield
        </span>
        VƯỢT QUA CƠN THÈM (SOS 3 PHÚT)
      </button>
    </div>
  );
};
