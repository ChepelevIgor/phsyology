import { FearType } from '@/src/entities/fear/model/types';
import { create } from 'zustand';



interface ChooseFearState {
  fear?: FearType;
  choose: (f: FearType) => void;
}


export const useChooseFear = create<ChooseFearState>((set) => ({
  fear: undefined,
  choose: (fear) => set({ fear }),
}));