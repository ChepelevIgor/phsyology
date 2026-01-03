import React from 'react';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  phase: 'inhale' | 'exhale';
}

export const BreathingCircle: React.FC<Props> = ({ phase }) => {
  const scale = useSharedValue(phase === 'inhale' ? 1.2 : 0.5);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  scale.value = withRepeat(
    withTiming(phase === 'inhale' ? 1.2 : 0.5, { duration: 4000 }),
    -1,
    true
  );

  return <Animated.View style={[styles.circle, animatedStyle]} />;
};

const styles = StyleSheet.create({
  circle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#5C67F2',
    opacity: 0.6,
    marginBottom: 40,
  },
});
