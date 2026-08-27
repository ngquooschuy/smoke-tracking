import React, { useState, useEffect } from 'react';
import { audioService } from '../../services/audio.service.ts';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [breatheStatus, setBreatheStatus] = useState<string>('HÍT VÀO');

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(180);
      setBreatheStatus('HÍT VÀO');
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setBreatheStatus('HOÀN THÀNH!');
          audioService.levelUp();
          return 0;
        }

        const next = prev - 1;
        const cycle = (180 - next) % 8;
        if (cycle === 0) {
          setBreatheStatus('HÍT VÀO...');
          audioService.breatheTick(true);
        } else if (cycle === 4) {
          setBreatheStatus('THỞ RA...');
          audioService.breatheTick(false);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const handleFinish = () => {
    onFinish();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-surface border-4 border-pixel-black pixel-shadow-lg max-w-sm w-full p-6 text-center relative">
        <button
          onClick={() => {
            audioService.click();
            onClose();
          }}
          className="absolute top-3 right-3 text-on-surface hover:text-error text-xl font-bold"
          type="button"
        >
          ✕
        </button>

        <h3 className="font-display-lg text-lg text-lemon-shock uppercase font-bold mb-2 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-2xl text-secondary">shield</span>
          3 PHÚT KHẮC CHẾ CƠN THÈM
        </h3>
        <p className="text-xs text-on-surface-variant mb-6">
          Cơn thèm thuốc chỉ đạt đỉnh trong 3 phút rồi sẽ tắt hẳn. Hãy hít thở theo nhịp vòng tròn bên dưới!
        </p>

        {/* Breathing Graphic */}
        <div className="w-40 h-40 mx-auto mb-6 border-4 border-primary-container flex flex-col items-center justify-center bg-pixel-black breathe-animation pixel-shadow-neon">
          <span className="font-display-lg text-sm font-bold text-lemon-shock uppercase tracking-wider">
            {breatheStatus}
          </span>
          <span className="font-display-lg text-3xl font-bold text-primary-container mt-1">
            {timeStr}
          </span>
        </div>

        <p className="text-xs text-on-surface mb-6">
          Gợi ý: Hãy nhấp 1 ngụm nước mát và thở chậm qua mũi!
        </p>

        <button
          onClick={handleFinish}
          className="w-full py-3 bg-primary-container text-pixel-black font-display-lg text-sm font-bold uppercase border-2 border-pixel-black pixel-shadow active-press"
          type="button"
        >
          HOÀN THÀNH (+10.000 EXP)
        </button>
      </div>
    </div>
  );
};
