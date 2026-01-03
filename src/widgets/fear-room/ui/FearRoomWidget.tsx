import { PositiveCard } from '@entities/practice/ui/PositiveCard';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const FearRoomWidget = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Жить вечно</Text>
      <Text style={styles.subtitle}>Комната борьбы со страхами</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PositiveCard title="Публичные выступления" subtitle="Ты спокоен" color="#FF6B81" />
        <PositiveCard title="Высота" subtitle="Ты уверен" color="#FFD93D" />
        <PositiveCard title="Перемены" subtitle="Ты адаптивен" color="#6BCB77" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 8,
  },
});
