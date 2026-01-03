import { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export const useBreathingPhase = (interval = 4000) => {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');

  useEffect(() => {
    const id = setInterval(() => {
      setPhase(prev => (prev === 'inhale' ? 'exhale' : 'inhale'));
      Haptics.selectionAsync(); // микро-вибрация при смене фазы
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return phase;
};
