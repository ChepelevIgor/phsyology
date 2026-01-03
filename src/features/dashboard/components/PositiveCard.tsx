// src/features/dashboard/components/PositiveCard.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';

interface PositiveCardProps {
  title: string;
  subtitle?: string;
  icon?: any; // Lottie JSON или картинка
  color?: string; // Цвет карточки
  onPress?: () => void;
}

export const PositiveCard: React.FC<PositiveCardProps> = ({
  title,
  subtitle,
  icon,
  color = '#6C63FF',
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  // Пульсация света
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const animatedBackground = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [color, '#ffffff33'], // слегка светящийся цвет
  });

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }], backgroundColor: animatedBackground }]}>
        {icon && typeof icon === 'object' ? (
          <LottieView source={icon} autoPlay loop style={styles.icon} />
        ) : (
          icon && <Image source={icon} style={styles.icon} />
        )}
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 180,
    borderRadius: 24,
    marginHorizontal: 10,
    shadowColor: '#fff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});
