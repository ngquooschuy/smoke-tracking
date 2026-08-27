import React, { useState } from 'react';
import { SmokingReason } from '../../enums/reason.enum.ts';
import { audioService } from '../../services/audio.service.ts';

interface RelapseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: SmokingReason | string) => void;
}

export const RelapseModal: React.FC<RelapseModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState<SmokingReason>(SmokingReason.STRESS);

  if (!isOpen) return null;

  const reasons = [
    { value: SmokingReason.STRESS, label: '⚡ Căng thẳng' },
    { value: SmokingReason.CAFE, label: '☕ Đi cafe' },
    { value: SmokingReason.MEAL, label: '🍜 Sau bữa ăn' },
    { value: SmokingReason.HABIT, label: '🎮 Thói quen' }
  ];

  const handleSelect = (r: SmokingReason) => {
    audioService.click();
    setSelectedReason(r);
  };

  const handleConfirm = () => {
    onConfirm(selectedReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-surface border-4 border-pixel-black pixel-shadow-lg max-w-sm w-full p-5 relative">
        <div className="flex items-center justify-between border-b-2 border-pixel-black pb-2 mb-4">
          <h3 className="font-display-lg text-base text-error uppercase font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span>
            XÁC NHẬN VỪA HÚT THUỐC?
          </h3>
          <button
            onClick={() => {
              audioService.click();
              onClose();
            }}
            className="text-on-surface hover:text-error text-xl font-bold"
            type="button"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-on-surface-variant mb-4">
          Đừng nản lòng! Vấp ngã là một phần của hành trình cai thuốc. Ghi nhận lại nguyên nhân để lần sau né tránh:
        </p>

        <div className="space-y-2 mb-5">
          <label className="block text-xs font-bold uppercase text-lemon-shock">Nguyên nhân kích hoạt:</label>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => {
              const isSelected = selectedReason === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => handleSelect(r.value)}
                  className={`p-2 border-2 text-xs font-bold text-left active-press-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-container text-pixel-black border-primary-container'
                      : 'bg-surface-variant text-on-surface border-pixel-black hover:border-primary-container'
                  }`}
                  type="button"
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-error text-pixel-black font-display-lg text-sm font-bold uppercase border-2 border-pixel-black pixel-shadow-sm active-press"
            type="button"
          >
            GHI NHẬN (+1 ĐIẾU)
          </button>
          <button
            onClick={() => {
              audioService.click();
              onClose();
            }}
            className="w-1/3 py-3 bg-surface-bright text-on-surface font-display-lg text-sm font-bold uppercase border-2 border-pixel-black active-press-sm"
            type="button"
          >
            HỦY
          </button>
        </div>
      </div>
    </div>
  );
};
