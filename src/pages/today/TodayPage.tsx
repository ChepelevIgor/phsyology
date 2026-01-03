
import { ChooseFearSlide } from '@features/choose-fear/ui/ChooseFearSlide';
import { PracticeSlide } from '@features/choose-fear/ui/PracticeSlide';
import { SlideDeck } from '@widgets/slide-deck/ui/SlideDeck';
import React from 'react';

export const TodayPage = () => (
<SlideDeck slides={[<ChooseFearSlide />, <PracticeSlide />]} />
);