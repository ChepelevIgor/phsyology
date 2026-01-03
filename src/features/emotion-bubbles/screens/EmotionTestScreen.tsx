import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmotionBubblesFeature } from '../components/EmotionBubbles';
const mockEmotions = [
  { emotion: 'радость', text: 'Я смеялся с друзьями в детском саду' },
  { emotion: 'грусть', text: 'Меня обидел друг в школе' },
  { emotion: 'страх', text: 'Меня напугал громкий звук' },
  { emotion: 'гнев', text: 'Меня несправедливо наказали' },
  { emotion: 'удивление', text: 'Я увидел новый город' },
  { emotion: 'радость', text: 'Я получил первую игрушку' },
  { emotion: 'грусть', text: 'Я скучал по родителям' },
  { emotion: 'радость', text: 'Меня похвалили за рисунок' },
];
export const EmotionTestScreen = () => {
  return (
    <View style={styles.container}>
      <EmotionBubblesFeature emotions={mockEmotions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0C1C' },
});
