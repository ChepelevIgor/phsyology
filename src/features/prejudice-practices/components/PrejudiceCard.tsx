// src/features/prejudice-practices/components/PrejudiceCard.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export const PrejudiceCard: React.FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  text: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
