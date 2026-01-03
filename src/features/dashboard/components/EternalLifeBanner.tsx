// src/features/dashboard/components/EternalLifeBanner.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import eternalAnimation from '@shared/animations/eternal.json'; // твоя анимация

const { width } = Dimensions.get('window');

export const EternalLifeBanner: React.FC = () => (
  <View style={styles.container}>
    <LottieView
      source={eternalAnimation}
      autoPlay
      loop
      style={styles.animation}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { width, height: 180, marginBottom: 20 },
  animation: { width, height: 180 },
});
