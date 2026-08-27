import React, { useState, useEffect } from 'react';
import { IAppConfig } from '../../models/config.model.ts';
import { audioService } from '../../services/audio.service.ts';

interface SettingsModalProps {
  isOpen: boolean;
  config: IAppConfig;
  isInstallable: boolean;
  onClose: () => void;
  onSave: (newConfig: Partial<IAppConfig>) => void;
  onReset: () => void;
  onInstall: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  config,
  isInstallable,
  onClose,
  onSave,
  onReset,
  onInstall
}) => {
  const [form, setForm] = useState<IAppConfig>(config);

  useEffect(() => {
    setForm(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.coin();
    onSave(form);
    onClose();
  };

  const handleReset = () => {
    if (confirm('CẢNH BÁO: Bạn có chắc chắn muốn RESET toàn bộ lịch sử và đếm lại từ đầu?')) {
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-surface border-4 border-pixel-black pixel-shadow-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-2 border-pixel-black pb-2 mb-4">
          <h3 className="font-display-lg text-base text-lemon-shock uppercase font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">settings</span>
            CÀI ĐẶT HỆ THỐNG
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
              Tên Hiệp Sĩ (Nickname)
            </label>
            <input
              type="text"
              className="w-full bg-pixel-black text-primary-container border-2 border-primary-container p-2 text-sm font-bold uppercase focus:outline-none"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                Giá 1 gói thuốc (VNĐ)
              </label>
              <input
                type="number"
                className="w-full bg-pixel-black text-lemon-shock border-2 border-lemon-shock p-2 text-sm font-bold focus:outline-none"
                value={form.costPerPack}
                onChange={(e) => setForm({ ...form, costPerPack: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                Số điếu/ngày trước đây
              </label>
              <input
                type="number"
                className="w-full bg-pixel-black text-lemon-shock border-2 border-lemon-shock p-2 text-sm font-bold focus:outline-none"
                value={form.cigsPerDayOld}
                onChange={(e) => setForm({ ...form, cigsPerDayOld: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="border-t-2 border-pixel-black pt-3 space-y-2">
            <label className="flex items-center justify-between cursor-pointer p-2 bg-surface-variant border border-pixel-black">
              <span className="text-xs font-bold uppercase">Âm thanh 8-bit Arcade</span>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary-container"
                checked={form.soundEnabled}
                onChange={(e) => setForm({ ...form, soundEnabled: e.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-2 bg-surface-variant border border-pixel-black">
              <span className="text-xs font-bold uppercase">Rung phản hồi (Haptics)</span>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary-container"
                checked={form.hapticsEnabled}
                onChange={(e) => setForm({ ...form, hapticsEnabled: e.target.checked })}
              />
            </label>
          </div>

          <div className="border-t-2 border-pixel-black pt-3 space-y-2">
            {isInstallable && (
              <button
                type="button"
                onClick={onInstall}
                className="w-full py-2.5 bg-secondary text-pixel-black font-display-lg text-xs font-bold uppercase border-2 border-pixel-black pixel-shadow-sm active-press-sm flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-base">download</span> Cài đặt App vào điện thoại
              </button>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary-container text-pixel-black font-display-lg text-sm font-bold uppercase border-2 border-pixel-black pixel-shadow active-press"
            >
              LƯU CÀI ĐẶT
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 bg-error text-pixel-black font-display-lg text-xs font-bold uppercase border-2 border-pixel-black active-press-sm"
            >
              RESET TOÀN BỘ DỮ LIỆU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
