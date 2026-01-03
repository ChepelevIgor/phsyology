import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const COLORS = ['#FFD700', '#4AD991', '#FF6B6B'];
const COUNTS = [12, 5, 8]; // пример цифр для шариков

export const EmotionMemoryRow = () => {
  return (
    <View style={styles.row}>
      {COLORS.map((color, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.ball, { backgroundColor: color }]}
        >
          <Text style={styles.ballText}>{COUNTS[i]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ball: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  ballText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
