import React from 'react';
import { audioService } from '../../services/audio.service.ts';

interface IosInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IosInstallModal: React.FC<IosInstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="bg-surface border-4 border-pixel-black pixel-shadow-lg max-w-sm w-full p-5 text-center relative">
        <button
          onClick={() => {
            audioService.click();
            onClose();
          }}
          className="absolute top-3 right-3 text-on-surface text-xl font-bold"
          type="button"
        >
          ✕
        </button>
        <h3 className="font-display-lg text-base text-lemon-shock uppercase font-bold mb-3 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-xl">ios_share</span>
          CÀI ĐẶT TRÊN IPHONE / IPAD
        </h3>
        <div className="text-left text-xs space-y-3 bg-pixel-black p-3 border-2 border-pixel-black mb-4">
          <p>
            1. Nhấn nút <strong>Chia sẻ (Share <span className="material-symbols-outlined text-sm align-middle text-primary-container">ios_share</span>)</strong> ở thanh công cụ Safari.
          </p>
          <p>
            2. Cuộn xuống chọn <strong>"Thêm vào Màn hình chính" (Add to Home Screen <span className="material-symbols-outlined text-sm align-middle text-primary-container">add_box</span>)</strong>.
          </p>
          <p>
            3. Nhấn <strong>"Thêm" (Add)</strong> ở góc trên bên phải để cài đặt.
          </p>
        </div>
        <button
          onClick={() => {
            audioService.click();
            onClose();
          }}
          className="w-full py-2.5 bg-primary-container text-pixel-black font-bold uppercase text-xs border-2 border-pixel-black active-press-sm"
          type="button"
        >
          ĐÃ HIỂU
        </button>
      </div>
    </div>
  );
};
