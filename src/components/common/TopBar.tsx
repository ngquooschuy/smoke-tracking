import React from 'react';

interface TopBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  isOnline: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  isOnline
}) => {
  return (
    <header className="w-full top-0 sticky border-b-4 border-pixel-black bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center px-4 h-16 z-40 safe-top">
      <button
        onClick={onToggleSound}
        className="material-symbols-outlined text-primary-container hover:bg-surface-bright p-2 border-2 border-pixel-black pixel-shadow-sm active-press-sm transition-colors"
        title="Bật/Tắt âm thanh 8-bit"
        type="button"
      >
        {soundEnabled ? 'volume_up' : 'volume_off'}
      </button>

      <h1 className="font-display-lg text-lg md:text-2xl text-lemon-shock tracking-widest uppercase font-bold text-center flex items-center gap-2">
        <span className="material-symbols-outlined text-lemon-shock text-xl">sports_esports</span>
        SMOKE_QUEST.EXE
      </h1>

      <div className="flex items-center gap-2">
        {!isOnline && (
          <span className="bg-error text-pixel-black text-[10px] font-bold px-2 py-0.5 border border-pixel-black flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">wifi_off</span>
            OFFLINE
          </span>
        )}
        <button
          onClick={onOpenSettings}
          className="material-symbols-outlined text-primary-container hover:bg-surface-bright p-2 border-2 border-pixel-black pixel-shadow-sm active-press-sm transition-colors"
          title="Cài đặt"
          type="button"
        >
          settings
        </button>
      </div>
    </header>
  );
};
