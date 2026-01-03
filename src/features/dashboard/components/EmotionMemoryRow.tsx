import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';

export const EmotionMemoryRow = () => {
  const [expanded, setExpanded] = useState(false);

  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: expanded ? 0 : 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  const scaleSmall = anim;
  const opacitySmall = anim;

  const scaleBig = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.92],
  });

  return (
    <View style={styles.row}>
      {/* Маленькие шары */}
      <Animated.View
        style={[
          styles.smallGroup,
          {
            opacity: opacitySmall,
            transform: [{ scale: scaleSmall }],
          },
        ]}
        pointerEvents={expanded ? 'auto' : 'none'}
      >
        <View style={styles.emotionMemoryRow}>
          <TouchableOpacity style={[styles.memoryBall, { backgroundColor: '#FFD700' }]}>
            <Text style={styles.memoryCount}>12</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.memoryBall, { backgroundColor: '#4AD991' }]}>
            <Text style={styles.memoryCount}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.memoryBall, { backgroundColor: '#6C63FF' }]}>
            <Text style={styles.memoryCount}>3</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Большой шар */}
      <Animated.View style={{ transform: [{ scale: scaleBig }] }}>
        <TouchableOpacity style={styles.bigBall} onPress={toggle}>
          <Text style={styles.bigBallText}>●</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emotionMemoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginRight: 16,
  },

  smallGroup: {
    flexDirection: 'row',
  },

  memoryBall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  memoryCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  bigBall: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB347',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  bigBallText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
});
