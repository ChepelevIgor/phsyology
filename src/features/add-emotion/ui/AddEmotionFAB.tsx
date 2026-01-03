import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAddEmotion } from '../model/useAddEmotion';

export const AddEmotionFAB = () => {
  const { addEmotion } = useAddEmotion();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => addEmotion()}
      activeOpacity={0.85}
    >
      <Ionicons name="heart-circle" size={40} color="#FF6B6B" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    backgroundColor: '#1A1B2F',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});
