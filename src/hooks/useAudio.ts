import { useEffect, useState } from 'react';
import { audioService } from '../services/audio.service.ts';

export function useAudio(initialEnabled: boolean = true) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialEnabled);

  useEffect(() => {
    audioService.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioService.enabled = next;
    if (next) audioService.coin();
  };

  return {
    soundEnabled,
    toggleSound,
    audio: audioService
  };
}
