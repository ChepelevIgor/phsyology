import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmotionMemoryRow } from '@entities/emotion/ui/EmotionMemoryRow';


export const DashboardHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={26}
            color="#FF6B6B"
          />
        </TouchableOpacity>

        <EmotionMemoryRow />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1B2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
