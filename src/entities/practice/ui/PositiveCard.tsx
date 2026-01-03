import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
  color: string;
  onPress?: () => void;
};

export const PositiveCard: React.FC<Props> = ({
  title,
  subtitle,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 110,
    borderRadius: 16,
    padding: 12,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 13,
    opacity: 0.9,
  },
});
