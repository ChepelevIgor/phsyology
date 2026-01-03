// src/features/dashboard/components/AnimatedMenu.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import particlesAnimation from '@shared/animations/particles.json';

interface PositiveCardProps {
  title: string;
  subtitle?: string;
  icon?: any;
  onPress?: () => void;
  color?: string;
}

const PositiveCard: React.FC<PositiveCardProps> = ({ title, subtitle, icon, onPress, color = '#5C67F2' }) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[styles.card, { backgroundColor: color }]}>
    {icon && (
      <LottieView
        source={icon}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />
    )}
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </TouchableOpacity>
);

interface AnimatedMenuProps {
  onSelectPractice: (title: string) => void;
}

export const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ onSelectPractice }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.container}
    contentContainerStyle={{ paddingHorizontal: 16 }}
  >
    {/* Здоровье */}
    <PositiveCard title="Отличный сон" subtitle="Ты выспался!" icon={particlesAnimation} color="#6C63FF" />
    <PositiveCard title="Достаточно воды" subtitle="1.5л сегодня" icon={particlesAnimation} color="#4AD991" />
    <PositiveCard title="Физическая активность" subtitle="30 мин движения" icon={particlesAnimation} color="#FF8C42" />

    {/* Победа над страхами */}
    <PositiveCard
      title="Публичные выступления"
      subtitle="Ты уверен и спокоен"
      onPress={() => onSelectPractice('Публичные выступления')}
      color="#FF6B81"
    />
    <PositiveCard
      title="Высота"
      subtitle="Ты смело поднимаешься"
      onPress={() => onSelectPractice('Высота')}
      color="#FFD93D"
    />
    <PositiveCard
      title="Перемены"
      subtitle="Ты легко адаптируешься"
      onPress={() => onSelectPractice('Перемены')}
      color="#6BCB77"
    />

    {/* Победа над сомнениями */}
    <PositiveCard
      title="Нет отказов"
      subtitle="Ты действуешь смело"
      onPress={() => onSelectPractice('Страх отказа')}
      color="#FF6B6B"
    />
    <PositiveCard
      title="Уверенность в себе"
      subtitle="Ты знаешь свою ценность"
      onPress={() => onSelectPractice('Сомнения')}
      color="#4D96FF"
    />
    <PositiveCard
      title="Я могу всё"
      subtitle="Ты способен на большее"
      onPress={() => onSelectPractice('Не могу')}
      color="#FFD700"
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  card: {
    width: 180,
    height: 120,
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  textWrapper: {
    zIndex: 2,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: '#F0F0F0', fontSize: 14, marginTop: 4, textAlign: 'center' },
});
