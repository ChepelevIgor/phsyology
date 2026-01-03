import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SlideDeck from '@shared/components/SlideDeck';
import { TodayPage } from '@pages/today/TodayPage';
import { BreathingSlide } from '@features/breathing-practice';
import { DashboardScreen } from '@pages/dashboard/ui/DashboardScreen';



export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <DashboardScreen />
      {/* <SlideDeck> */}
        {/* Сегодняшняя страница */}
        {/* <TodayPage /> */}

        {/* Дыхательная практика */}
        {/* <BreathingSlide /> */}

        {/* Можно добавлять новые слайды-фичи */}
        {/* <VisualizationSlide /> */}
        {/* <ExposureSlide /> */}
      {/* </SlideDeck> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#000' },
});
