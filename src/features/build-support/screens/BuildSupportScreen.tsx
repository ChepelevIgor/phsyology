import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import particlesAnimation from '@shared/animations/particles.json';

const { width } = Dimensions.get('window');

interface Support {
  id: number;
  label: string;
  icon: any; // require image
}

interface Props {
  memories: { text: string; emotion?: string }[];
}

const defaultSupports: Support[] = [
  { id: 1, label: 'Семья', icon: require('../../../../assets/images/eternal_icon.jpeg') },
  { id: 2, label: 'Друзья', icon: require('../../../../assets/images/eternal_icon.jpeg') },
  { id: 3, label: 'Учёба', icon: require('../../../../assets/images/eternal_icon.jpeg') },
  { id: 4, label: 'Хобби', icon: require('../../../../assets/images/eternal_icon.jpeg') },
  { id: 5, label: 'Мечты', icon: require('../../../../assets/images/eternal_icon.jpeg') },
];

export const BuildSupportScreen: React.FC<Props> = ({ memories }) => {
  const [supports, setSupports] = useState<Support[]>(defaultSupports);
  const [selectedSupportId, setSelectedSupportId] = useState<number | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  // --- Логика AI для предложения опоры ---
  useEffect(() => {
    if (!memories || memories.length === 0) {
      setAiSuggestion('Добавь воспоминания, чтобы AI мог предложить опору');
      return;
    }

    // Простая логика: ищем самые частые эмоции и выдаем подсказку
    const emotionCounts: { [key: string]: number } = {};
    memories.forEach(m => {
      if (m.emotion) {
        emotionCounts[m.emotion] = (emotionCounts[m.emotion] || 0) + 1;
      }
    });

    const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
    if (sortedEmotions.length === 0) {
      setAiSuggestion('AI анализирует твои воспоминания...');
    } else {
      const topEmotion = sortedEmotions[0][0];
      let suggestion = '';
      switch (topEmotion.toLowerCase()) {
        case 'страх':
          suggestion = 'Попробуй построить опору через семью и друзей для безопасности';
          break;
        case 'радость':
          suggestion = 'Поддерживай свои хобби и мечты как опору';
          break;
        case 'печаль':
          suggestion = 'Обрати внимание на друзей и близких как поддержку';
          break;
        default:
          suggestion = 'AI предлагает укреплять привычки и мечты как опору';
      }
      setAiSuggestion(suggestion);
    }
  }, [memories]);

  const handleSelectSupport = (supportId: number) => {
    setSelectedSupportId(supportId);
    Alert.alert('Выбрана опора', `Вы выбрали: ${supports.find(s => s.id === supportId)?.label}`);
  };

  const handleAddCustomSupport = () => {
    Alert.prompt(
      'Новая опора',
      'Введите название вашей опоры',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Создать',
          onPress: text => {
            if (!text) return;
            const newSupport: Support = {
              id: supports.length + 1,
              label: text,
              icon: require('../../../../assets/images/eternal_icon.jpeg'), // placeholder
            };
            setSupports(prev => [...prev, newSupport]);
            setSelectedSupportId(newSupport.id);
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={styles.container}>
      {/* Фон */}
      <LottieView source={particlesAnimation} autoPlay loop style={StyleSheet.absoluteFillObject} />

      <Text style={styles.header}>Построить опору</Text>
      <Text style={styles.subHeader}>Выбери опоры, которые тебя поддерживают</Text>

      {/* Карусель опор */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 16 }}>
        {supports.map(s => (
          <TouchableOpacity 
            key={s.id} 
            onPress={() => handleSelectSupport(s.id)}
            style={[
              styles.supportCard,
              selectedSupportId === s.id && styles.activeSupportCard
            ]}
          >
            <Image source={s.icon} style={styles.supportIcon} />
            <Text style={styles.supportLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Кнопка добавления своей опоры */}
        <TouchableOpacity style={[styles.supportCard, styles.addSupportCard]} onPress={handleAddCustomSupport}>
          <Ionicons name="add-circle" size={50} color="#FFD700" />
          <Text style={styles.supportLabel}>Своя опора</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* AI-подсказка */}
      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>Совет AI</Text>
        <Text style={styles.aiText}>{aiSuggestion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C1C', paddingTop: 60 },
  header: { fontSize: 28, fontWeight: '700', color: '#F5F5F5', textAlign: 'center' },
  subHeader: { fontSize: 16, color: '#CCC', textAlign: 'center', marginTop: 4 },
  supportCard: { width: 120, height: 140, marginRight: 12, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1B2F', padding: 8 },
  activeSupportCard: { borderWidth: 2, borderColor: '#6C63FF', transform: [{ scale: 1.1 }] },
  supportIcon: { width: 80, height: 80, borderRadius: 40 },
  supportLabel: { color: '#FFF', fontWeight: '700', marginTop: 8, textAlign: 'center' },
  addSupportCard: { backgroundColor: '#3A3B4F', justifyContent: 'center', paddingTop: 8 },
  aiBox: { marginHorizontal: 16, marginTop: 24, backgroundColor: '#1F1F2F', borderRadius: 16, padding: 16 },
  aiTitle: { fontSize: 16, fontWeight: '700', color: '#FFD700', marginBottom: 8 },
  aiText: { fontSize: 14, color: '#FFF' },
});
