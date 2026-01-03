import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';


export const SlideDeck: React.FC<{ slides: React.ReactNode[] }> = ({ slides }) => {
  const [i] = useState(0); // simplified MVP (no gestures yet)
  return <View style={styles.wrap}>{slides[i]}</View>;
};


const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, justifyContent: 'center' },
});


