// src/features/health-tracker/components/HealthCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  title: string;
  value: string;
  icon?: any; // Lottie JSON
}

export const HealthCard: React.FC<Props> = ({ title, value, icon }) => (
  <View style={styles.card}>
    {icon && <LottieView source={icon} autoPlay loop style={styles.icon} />}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#1C1F2A',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  icon: { width: 60, height: 60, marginBottom: 10 },
  title: { color: '#F5F5F5', fontSize: 16, marginBottom: 6 },
  value: { color: '#5C67F2', fontSize: 24, fontWeight: '600' },
});
