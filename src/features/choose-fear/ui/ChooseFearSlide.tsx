import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { FEARS } from '../../../entities/fear/model/data';
import { Text } from '../../../shared/ui//text/Text';
import { useChooseFear } from '../store';


export const ChooseFearSlide = () => {
  const choose = useChooseFear((s) => s.choose);
  return (
    <View style={styles.wrap}>
      {FEARS.map((f) => (
        <Pressable key={f.id} onPress={() => choose(f.id)} style={styles.card}>
          <Text size={20}>{f.title}</Text>
          <Text muted>{f.mirror}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111',
  }
})