import React, { useState } from 'react';

interface PwaInstallBannerProps {
  isInstallable: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  onInstall: () => void;
  onShowIOSGuide: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({
  isInstallable,
  isIOS,
  isStandalone,
  onInstall,
  onShowIOSGuide
}) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed || isStandalone || (!isInstallable && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary-container text-pixel-black px-4 py-2 border-b-4 border-pixel-black flex items-center justify-between shadow-lg text-xs md:text-sm font-bold">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-xl">download</span>
        <span>
          {isIOS ? (
            <>
              Cài đặt <strong>SMOKE_QUEST</strong> vào màn hình chính iPhone để sử dụng!
            </>
          ) : (
            <>
              Cài đặt <strong>SMOKE_QUEST</strong> vào màn hình chính để sử dụng offline!
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={isIOS ? onShowIOSGuide : onInstall}
          className="bg-pixel-black text-lemon-shock px-3 py-1 border-2 border-pixel-black font-bold uppercase active-press-sm hover:bg-surface-container"
          type="button"
        >
          {isIOS ? 'HƯỚNG DẪN' : 'CÀI ĐẶT'}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-pixel-black hover:opacity-75 text-lg font-bold px-1"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
