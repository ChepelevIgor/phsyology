import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PRACTICES } from '../../../entities/practice/model/data';
import { Text } from '../../../shared/ui//text/Text';
import { useChooseFear } from '../store';


export const PracticeSlide = () => {
  const fear = useChooseFear((s) => s.fear);
  const practice = PRACTICES.find((p) => p.fear === fear);
  if (!practice) return null;
  return (
    <View style={styles.wrap}>
      <Text size={22}>{practice.title}</Text>
      <Text>{practice.instruction}</Text>
    </View>
  );
};


const styles = StyleSheet.create({ wrap: { gap: 16 } });