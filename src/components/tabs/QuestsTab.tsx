import React from 'react';
import { IQuest } from '../../models/quest.model.ts';

interface QuestsTabProps {
  quests: IQuest[];
  onClaimQuest: (questId: string) => void;
}

export const QuestsTab: React.FC<QuestsTabProps> = ({ quests, onClaimQuest }) => {
  const formatMoney = (num: number) => num.toLocaleString('vi-VN');

  return (
    <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-5 space-y-4">
      <div className="flex items-center justify-between border-b-2 border-pixel-black pb-2">
        <h2 className="font-display-lg text-lg text-lemon-shock uppercase font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">sports_esports</span>
          NHIỆM VỤ CHIẾN TRƯỜNG
        </h2>
        <span className="text-xs bg-pixel-black text-primary-container px-2 py-1 border border-primary-container font-bold">
          HÀNG NGÀY
        </span>
      </div>
      <p className="text-xs text-on-surface-variant">
        Hoàn thành nhiệm vụ để tăng HP Phổi và nhận Vàng EXP mua vật phẩm hồi phục!
      </p>

      <div className="space-y-3">
        {quests.map((quest) => {
          return (
            <div
              key={quest.id}
              className={`p-3 border-2 border-pixel-black flex items-center justify-between gap-3 ${
                quest.claimed
                  ? 'bg-surface opacity-60'
                  : quest.completed
                  ? 'bg-surface-container pixel-shadow-sm border-primary-container'
                  : 'bg-surface'
              }`}
            >
              <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
                <span className="material-symbols-outlined text-lemon-shock text-2xl flex-shrink-0 mt-0.5 md:mt-0">
                  {quest.icon || 'star'}
                </span>
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-xs md:text-sm text-on-surface uppercase leading-snug">
                    {quest.title}
                  </div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">{quest.desc}</div>
                  <div className="text-[10px] text-primary-container font-bold mt-1">
                    +{formatMoney(quest.exp)} Đ • +{quest.hp} HP
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 self-center" style={{ minWidth: 92, textAlign: 'right' }}>
                {quest.claimed ? (
                  <span className="quest-badge bg-surface-bright text-on-surface-variant border-2 border-pixel-black">
                    ĐÃ NHẬN
                  </span>
                ) : quest.completed ? (
                  <button
                    onClick={() => onClaimQuest(quest.id)}
                    className="btn-claim-quest quest-badge bg-primary-container text-pixel-black border-2 border-pixel-black pixel-shadow-sm active-press-sm uppercase"
                    type="button"
                  >
                    NHẬN VÀNG
                  </button>
                ) : (
                  <span className="quest-badge bg-pixel-black text-error border-2 border-error">
                    CHƯA XONG
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
