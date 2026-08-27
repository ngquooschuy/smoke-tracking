import React from 'react';
import { TabType } from '../../enums/tab.enum.ts';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TabType.QUESTS, label: 'QUESTS', icon: 'sports_esports' },
    { id: TabType.STATS, label: 'STATS', icon: 'bar_chart' },
    { id: TabType.RANK, label: 'RANK', icon: 'leaderboard' },
    { id: TabType.HERO, label: 'HERO', icon: 'person' }
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-24 border-r-4 border-pixel-black bg-surface-container z-30 pt-8 gap-4 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`desktop_${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-3 active-press-sm w-20 aspect-square transition-all ${
                isActive
                  ? 'bg-primary-container text-pixel-black border-4 border-pixel-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-on-surface-variant hover:bg-surface-bright border-2 border-transparent hover:border-pixel-black'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[32px] mb-2"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className={`font-label-md text-xs font-bold ${isActive ? 'text-pixel-black' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 border-t-4 border-pixel-black bg-surface-container flex justify-around items-center px-2 py-1 md:hidden safe-bottom shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`mobile_${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 active-press-sm w-1/4 transition-colors ${
                isActive
                  ? 'bg-primary-container text-pixel-black border-2 border-pixel-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-on-surface-variant'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined mb-1 text-2xl"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className={`font-label-md text-[11px] font-bold ${isActive ? 'text-pixel-black' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
