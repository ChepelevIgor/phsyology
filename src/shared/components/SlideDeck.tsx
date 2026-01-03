// src/shared/components/SlideDeck.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface SlideDeckProps {
  children: React.ReactNode;
}

const SlideDeck: React.FC<SlideDeckProps> = ({ children }) => {
  return (
    <ScrollView
      style={styles.container}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    >
      {React.Children.map(children, (child) => (
        <View style={styles.slide}>{child}</View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: { height, flex: 1 },
});

export default SlideDeck;
