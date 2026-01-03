import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

// Функция для цвета эмоции
const getEmotionColor = (emotion: string) => {
  switch (emotion?.toLowerCase()) {
    case 'радость': return '#FFD700';
    case 'грусть': return '#1E90FF';
    case 'страх': return '#FF6B6B';
    case 'гнев': return '#FF4500';
    case 'удивление': return '#6C63FF';
    default: return '#4AD991';
  }
};

// --- Компонент одного шарика ---
const EmotionBubble = ({ emotion, text, onPress }: any) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, { toValue: -5, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(animatedValue, { toValue: 5, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.bubble, { backgroundColor: getEmotionColor(emotion) }]}
      >
        <Text style={styles.bubbleText}>{emotion || '😊'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Основной компонент фичи ---
export const EmotionBubblesFeature = ({ emotions }: { emotions: { emotion: string, text: string }[] }) => {
  return (
    <View style={styles.container}>
      {emotions.map((e, idx) => (
        <EmotionBubble
          key={idx}
          emotion={e.emotion}
          text={e.text}
          onPress={() => alert(e.text)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  bubbleText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
