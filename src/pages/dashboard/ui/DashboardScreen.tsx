import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import particlesAnimation from '@shared/animations/particles.json';
// import { DashboardHeader } from '@widgets/header/dashboard-header/ui/DashboardHeader';
import { BehaviorAnalysisWidget } from '@widgets/behavior-analysis/ui/BehaviorAnalysisWidget';
import { FearRoomWidget } from '@widgets/fear-room/ui/FearRoomWidget';
import { FooterProfile } from '@widgets/footer-profile/ui/FooterProfile';
import { AddEmotionFAB } from '@features/add-emotion/ui/AddEmotionFAB';
import { SharePainModal } from '@features/share-pain/ui/SharePainModal';
import { DashboardHeader } from '@widgets/header/dashboard-header/ui/DashboardHeader';

export const DashboardScreen = () => {
  return (
    <ImageBackground
      source={require('@shared/assets/images/background2.png')}
      style={styles.bg}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <LottieView
          source={particlesAnimation}
          autoPlay
          loop
          style={StyleSheet.absoluteFillObject}
        />

        <DashboardHeader />
        <BehaviorAnalysisWidget />
        <FearRoomWidget />
        <FooterProfile />

                {/* Футер */}
        <FooterProfile />

        {/* FAB’ы (features) */}
        <AddEmotionFAB />        {/* правая кнопка */}
        <SharePainModal />      {/* слева + модалка */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,12,28,0.75)',
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
