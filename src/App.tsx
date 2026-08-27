import React, { useState } from 'react';
import { TabType } from './enums/tab.enum.ts';
import { useQuestStore } from './hooks/useQuestStore.ts';
import { useAudio } from './hooks/useAudio.ts';
import { usePWA } from './hooks/usePWA.ts';
import { TopBar } from './components/common/TopBar.tsx';
import { Navigation } from './components/common/Navigation.tsx';
import { PwaInstallBanner } from './components/common/PwaInstallBanner.tsx';
import { StatsTab } from './components/tabs/StatsTab.tsx';
import { TimelineTab } from './components/tabs/TimelineTab.tsx';
import { HeroTab } from './components/tabs/HeroTab.tsx';
import { RelapseModal } from './components/modals/RelapseModal.tsx';
import { SosModal } from './components/modals/SosModal.tsx';
import { SettingsModal } from './components/modals/SettingsModal.tsx';
import { IosInstallModal } from './components/modals/IosInstallModal.tsx';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.STATS);
  const [isRelapseModalOpen, setIsRelapseModalOpen] = useState<boolean>(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isIosModalOpen, setIsIosModalOpen] = useState<boolean>(false);

  const {
    state,
    timeElapsed,
    moneySaved,
    cigsAvoided,
    hp,
    rank,
    recordSmoke,
    recordCravingResisted,
    updateConfig,
    resetAll,
    triggerHaptic
  } = useQuestStore();

  const { soundEnabled, toggleSound, audio } = useAudio(state.config.soundEnabled);
  const { isInstallable, isOnline, isIOS, isStandalone, triggerInstall } = usePWA();

  const handleTabChange = (tab: TabType) => {
    audio.tab();
    triggerHaptic([10]);
    setActiveTab(tab);
  };

  const totalSmoked = state.relapses ? state.relapses.length : 0;

  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen relative overflow-x-hidden selection:bg-lemon-shock selection:text-pixel-black scanline">
      {/* CRT Vignette Overlay */}
      <div className="crt-overlay" />

      {/* PWA Install Banner */}
      <PwaInstallBanner
        isInstallable={isInstallable}
        isIOS={isIOS}
        isStandalone={isStandalone}
        onInstall={triggerInstall}
        onShowIOSGuide={() => setIsIosModalOpen(true)}
      />

      {/* Top App Bar */}
      <TopBar
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          toggleSound();
          updateConfig({ soundEnabled: !soundEnabled });
        }}
        onOpenSettings={() => {
          audio.click();
          setIsSettingsModalOpen(true);
        }}
        isOnline={isOnline}
      />

      {/* Main Shell */}
      <div className="flex justify-center">
        {/* Navigation for Desktop & Mobile */}
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content Area */}
        <main className="w-full max-w-md md:max-w-3xl p-4 md:p-8 space-y-4 pb-28 md:pb-16 md:ml-24">
          {activeTab === TabType.STATS && (
            <StatsTab
              todayCount={state.todayCount}
              timeElapsed={timeElapsed}
              hp={hp}
              moneySaved={moneySaved}
              onRecordSmoke={() => setIsRelapseModalOpen(true)}
              onOpenSos={() => {
                audio.click();
                setIsSosModalOpen(true);
              }}
            />
          )}

          {activeTab === TabType.TIMELINE && (
            <TimelineTab
              relapses={state.relapses}
              cravingsResisted={state.cravingsResisted}
            />
          )}

          {activeTab === TabType.HERO && (
            <HeroTab
              nickname={state.config.nickname}
              rank={rank}
              moneySaved={moneySaved}
              cigsAvoided={cigsAvoided}
              cravingsResisted={state.cravingsResisted}
              totalSmoked={totalSmoked}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <RelapseModal
        isOpen={isRelapseModalOpen}
        onClose={() => setIsRelapseModalOpen(false)}
        onConfirm={(reason) => recordSmoke(reason)}
      />

      <SosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        onFinish={recordCravingResisted}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        config={state.config}
        isInstallable={isInstallable}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={(newCfg) => updateConfig(newCfg)}
        onReset={resetAll}
        onInstall={triggerInstall}
      />

      <IosInstallModal
        isOpen={isIosModalOpen}
        onClose={() => setIsIosModalOpen(false)}
      />
    </div>
  );
};
