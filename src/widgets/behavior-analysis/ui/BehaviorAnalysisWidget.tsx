import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const features = [
  {
    id: 1,
    title: 'Анализ поведения',
    subtitle: 'Почему я сейчас такой?',
    icon: 'analytics',
    color: '#FFD700',
  },
  {
    id: 2,
    title: 'Опора счастья',
    subtitle: 'Построй свою поддержку',
    icon: 'leaf',
    color: '#4AD991',
  },
];

export const BehaviorAnalysisWidget = () => {
  const [active, setActive] = useState(0);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {features.map((item, index) => {
          const isActive = index === active;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: item.color + 'DD',
                  opacity: isActive ? 1 : 0.6,
                },
              ]}
              onPress={() => setActive(index)}
            >
              <Ionicons name={item.icon as any} size={32} color="#FFF" />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {isActive && <Text style={styles.hint}>➡ дальше</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
  },
  card: {
    width: 180,
    height: 140,
    borderRadius: 16,
    marginRight: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 13,
    textAlign: 'center',
  },
  hint: {
    color: '#FFF',
    fontWeight: '700',
  },
});
