import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BreathingCircle } from '../components/BreathingCircle';
import { useBreathingPhase } from '../hooks/useBreathingPhase';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

export const BreathingSlide: React.FC = () => {
  const phase = useBreathingPhase();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../shared/animations/particles.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />

      <BreathingCircle phase={phase} />

      <Text style={styles.instruction}>{phase === 'inhale' ? 'Вдох…' : 'Выдох…'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <Text style={styles.buttonText}>Сделать шаг</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C1C', alignItems: 'center', justifyContent: 'center', padding: 20 },
  instruction: { fontSize: 32, color: '#F5F5F5', marginBottom: 60 },
  button: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 20, backgroundColor: '#F5F5F5', opacity: 0.9 },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#0B0C1C' },
});
