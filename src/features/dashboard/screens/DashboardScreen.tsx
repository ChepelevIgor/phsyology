import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Image, TextInput, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import particlesAnimation from '@shared/animations/particles.json';
import { PositiveCard } from '../components/PositiveCard';
import { Ionicons } from '@expo/vector-icons';
import { EmotionBubblesFeature } from '@features/emotion-bubbles/components/EmotionBubbles';
import { EmotionTestScreen } from '@features/emotion-bubbles/screens/EmotionTestScreen';
import { BuildSupportScreen } from '@features/build-support/screens/BuildSupportScreen';

const lifeStages = [
  { id: 1, label: 'Младенец', emoji: '👶' },
  { id: 2, label: 'Ребёнок', emoji: '🧒' },
  { id: 3, label: 'Подросток', emoji: '🧑‍🦱' },
  { id: 4, label: 'Взрослый', emoji: '🧔' },
  { id: 5, label: 'Старый', emoji: '👴' },
];

const habits = [
  { id: 1, title: 'Сон', value: '8ч', color: '#6C63FF' },
  { id: 2, title: 'Вода', value: '1.5л', color: '#4AD991' },
  { id: 3, title: 'Физическая активность', value: '30 мин', color: '#FF6B6B' },
];


const LifeStagesRow: React.FC<{
  activeId: number;
  onSelect: (id: number) => void;
  onAddMemory: (stageId: number) => void;
  onAddEmotion: (stageId: number) => void;
}> = ({ activeId, onSelect, onAddMemory, onAddEmotion }) => (
  <View style={styles.lifeStagesRow}>
    {lifeStages.map(stage => (
      <View key={stage.id} style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => onSelect(stage.id)}
          style={[
            styles.stageCircle,
            activeId === stage.id && styles.stageCircleActive,
          ]}
        >
          <Text style={styles.stageEmoji}>{stage.emoji}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onAddEmotion(stage.id)}
          style={styles.addEmotionButton}
        >
          <Ionicons name="heart-circle" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

export const DashboardScreen: React.FC = () => {
  const [activeStage, setActiveStage] = useState(3); // Подросток
  const [activeTab, setActiveTab] = useState('Home');
  const [journal, setJournal] = useState<{ [stageId: number]: string }>({});

  const handlePracticeSelect = (title: string) => {
    Alert.alert('Практика', `Ты уже справился с: ${title}`);
  };

  const handleAddEmotion = (stageId: number) => {
    Alert.prompt(
      `Эмоция/ситуация: ${lifeStages.find(s => s.id === stageId)?.label}`,
      'Опиши ситуацию и свою реакцию (например: "Меня крикнули | испуг")',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Сохранить',
          onPress: input => {
            if (!input) return;
            const [situation, emotion] = input.split('|').map(str => str.trim());
            setJournal(prev => {
              const stageJournal = prev[stageId] || [];
              return {
                ...prev,
                [stageId]: [...stageJournal, { text: situation, emotion }],
              };
            });

            // Мини-анализ
            let hint = 'Ты добавил новое воспоминание.';
            if (emotion) {
              hint = `Интересно: твоя реакция "${emotion}" может быть связана с детством.`;
            }
            Alert.alert('Подсказка', hint);
          },
        },
      ],
      'plain-text'
    );
  };

  const renderInsightFeature = () => {
    const stageJournal = journal[activeStage] || { memories: [], emotions: [], text: '' };
    const allEmotions = stageJournal.emotions.map(e => e.emotion).filter(Boolean);
    const emotionCounts: any = {};
    allEmotions.forEach(e => (emotionCounts[e] = (emotionCounts[e] || 0) + 1));
    const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);

    return (
      <View style={styles.insightBox}>
        <Text style={styles.insightTitle}>Почему я сейчас такой?</Text>
        {sortedEmotions.length === 0 ? (
          <Text style={styles.insightText}>Добавь воспоминания и эмоции для анализа.</Text>
        ) : (
          sortedEmotions.map(([emotion, count]: any, i: number) => (
            <Text key={i} style={styles.insightText}>
              Эмоция "{emotion}" встречается {count} раз в этом этапе
            </Text>
          ))
        )}
      </View>
    );
  };



  interface Memory {
    text: string;
    emotion?: string;
  }
  const mockMemories: Memory[] = [
    { text: 'Меня обидел друг', emotion: 'печаль' },
    { text: 'Получил похвалу от учителя', emotion: 'радость' },
    { text: 'Перепугался на экзамене', emotion: 'страх' },
    { text: 'Играл с сестрой', emotion: 'радость' },
    { text: 'Меня крикнули', emotion: 'страх' },
  ];
  return (
    <View style={styles.container}>

      {/* Фоновая анимация */}
      <LottieView
        source={particlesAnimation}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Иконка приложения */}
≈≈
        {/* 4) Почему я сейчас такой */}
        <Text style={styles.sectionTitle}>Анализ поведения</Text>
        {renderInsightFeature()}
        {/* Жизненные этапы */}
        {/* Пространство эмоций */}
        <Text style={styles.sectionTitle}>Пространство эмоций</Text>
        <View style={styles.journalContainer}>
          <TextInput
            style={styles.journalInput}
            multiline
            placeholder="Отведи душу, напиши свои мысли..."
            placeholderTextColor="#AAA"
            value={journal[activeStage] || ''}
            onChangeText={text =>
              setJournal(prev => ({ ...prev, [activeStage]: text }))
            }
          />
        </View>

        {/* Заголовок */}
        <Text style={styles.header}>Жить вечно</Text>
        <Text style={styles.sectionTitle}>Комната борьбы со страхами</Text>

        {/* Победы над страхами */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginTop: 10 }}
        >
          <PositiveCard
            title="Публичные выступления"
            subtitle="Ты уверен и спокоен"
            onPress={() => handlePracticeSelect('Публичные выступления')}
            color="#FF6B81"
          />
          <PositiveCard
            title="Высота"
            subtitle="Ты смело поднимаешься"
            onPress={() => handlePracticeSelect('Высота')}
            color="#FFD93D"
          />
          <PositiveCard
            title="Перемены"
            subtitle="Ты легко адаптируешься"
            onPress={() => handlePracticeSelect('Перемены')}
            color="#6BCB77"
          />
          <PositiveCard
            title="Нет отказов"
            subtitle="Ты действуешь смело"
            onPress={() => handlePracticeSelect('Страх отказа')}
            color="#FF6B6B"
          />
          <PositiveCard
            title="Уверенность в себе"
            subtitle="Ты знаешь свою ценность"
            onPress={() => handlePracticeSelect('Сомнения')}
            color="#4D96FF"
          />
          <PositiveCard
            title="Я могу всё"
            subtitle="Ты способен на большее"
            onPress={() => handlePracticeSelect('Не могу')}
            color="#FFD700"
          />
        </ScrollView>


        <BuildSupportScreen memories={mockMemories}
        />
      </ScrollView>
      
      <TouchableOpacity style={styles.fab} onPress={handleAddEmotion}>
        <Ionicons name="heart-circle" size={32} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C1C', paddingTop: 60 },
  icon: { width: 120, height: 120, marginBottom: 20, borderRadius: 60, alignSelf: 'center' },
  header: { fontSize: 36, fontWeight: '700', color: '#F5F5F5', marginBottom: 10, textAlign: 'center' },
  sectionTitle: { color: '#F5F5F5', fontSize: 22, fontWeight: '700', marginLeft: 16, marginVertical: 12 },
  lifeStagesRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  stageCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#3A3B4F', marginHorizontal: 6, justifyContent: 'center', alignItems: 'center' },
  stageCircleActive: { backgroundColor: '#6C63FF', transform: [{ scale: 1.2 }] },
  stageEmoji: { fontSize: 24 },
  addMemoryButton: { marginTop: 4 },
  journalContainer: { marginHorizontal: 16, marginBottom: 20 },
  journalInput: { backgroundColor: '#1A1B2F', color: '#FFF', borderRadius: 16, padding: 12, minHeight: 100, textAlignVertical: 'top' },
  bottomMenu: { position: 'absolute', bottom: 0, width, height: 70, backgroundColor: '#1A1B2F', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  menuItem: { justifyContent: 'center', alignItems: 'center' },
  menuText: { color: '#FFF', fontSize: 12, marginTop: 4 },
  insightBox: { backgroundColor: '#1F1F2F', padding: 16, marginHorizontal: 16, borderRadius: 12, marginBottom: 16 },
  insightTitle: { fontWeight: 'bold', fontSize: 16, color: '#FFD700', marginBottom: 8 },
  insightText: { fontSize: 14, color: '#FFF', marginBottom: 4 },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    backgroundColor: '#1A1B2F',
    padding: 12,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});




import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Alert, TextInput, Modal, Image, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import particlesAnimation from '@shared/animations/particles.json';
import { Ionicons } from '@expo/vector-icons';
import { PositiveCard } from '../components/PositiveCard';
import { EmotionMemoryRow } from '../components/EmotionMemoryRow';

const { width } = Dimensions.get('window');

const features = [
  { id: 2, title: 'Анализ поведения', subtitle: 'Почему я сейчас такой?', icon: 'analytics', color: '#FFD700' },
  { id: 4, title: 'Опора счастья', subtitle: 'Построй свою поддержку', icon: 'leaf', color: '#4AD991' },
];
const lifeStages = [
  { id: 1, label: 'Младенец', emoji: '👶' },
  { id: 2, label: 'Ребёнок', emoji: '🧒' },
  { id: 3, label: 'Подросток', emoji: '🧑‍🦱' },
  { id: 4, label: 'Взрослый', emoji: '🧔' },
  { id: 5, label: 'Старый', emoji: '👴' },
];


export const DashboardScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [painMessage, setPainMessage] = useState('');
    const [journal, setJournal] = useState<{ [stageId: number]: string }>({});

  const handleAddEmotion = (stageId: number) => {
    Alert.prompt(
      `Эмоция/ситуация: ${lifeStages.find(s => s.id === stageId)?.label}`,
      'Опиши ситуацию и свою реакцию (например: "Меня крикнули | испуг")',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Сохранить',
          onPress: input => {
            if (!input) return;
            const [situation, emotion] = input.split('|').map(str => str.trim());
            setJournal(prev => {
              const stageJournal = prev[stageId] || [];
              return {
                ...prev,
                [stageId]: [...stageJournal, { text: situation, emotion }],
              };
            });

            // Мини-анализ
            let hint = 'Ты добавил новое воспоминание.';
            if (emotion) {
              hint = `Интересно: твоя реакция "${emotion}" может быть связана с детством.`;
            }
            Alert.alert('Подсказка', hint);
          },
        },
      ],
      'plain-text'
    );
  };


  const handlePress = (id: number) => {
    if (id === features[currentStep].id && currentStep < features.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSharePain = () => setModalVisible(true);

  

  const sendPainMessage = () => {
    if (!painMessage.trim()) {
      Alert.alert('Введите сообщение', 'Вы пока ничего не написали');
      return;
    }
    console.log('Пользователь поделился болью:', painMessage);
    setPainMessage('');
    setModalVisible(false);
    Alert.alert('Отправлено', 'Ваше сообщение успешно отправлено');
  };

  const handlePracticeSelect = (title: string) => {
    Alert.alert('Практика', `Ты уже справился с: ${title}`);
  };

  return (
   <ImageBackground
      source={require('../../../../assets/images/background2.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* затемняющий слой */}
      <View style={styles.overlay} />

    <View style={styles.container}>
      {/* Фоновая анимация */}
      <LottieView source={particlesAnimation} autoPlay loop style={StyleSheet.absoluteFillObject} />

      {/* Хедер */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.painButton} onPress={handleSharePain}>
            <Ionicons name="chatbubble-ellipses-outline" size={28} color="#FF6B6B" />
          </TouchableOpacity>
  <EmotionMemoryRow />
        </View>
      </View>

      {/* Вертикальный стек: функции + Жить вечно */}
      <View style={styles.verticalStack}>
        {/* Горизонтальные карточки функций */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 0 }}>
          {features.map((f, index) => {
            const isActive = index === currentStep;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.featureCardHorizontal, { backgroundColor: f.color + 'DD', opacity: isActive ? 1 : 0.6 }]}
                activeOpacity={0.85}
                onPress={() => handlePress(f.id)}
              >
                <Ionicons name={f.icon as any} size={32} color="#FFF" style={{ marginBottom: 6 }} />
                <Text style={styles.cardTitleHorizontal}>{f.title}</Text>
                <Text style={styles.cardSubtitleHorizontal}>{f.subtitle}</Text>
                {isActive && (
                  <View style={styles.nextHintHorizontal}>
                    <Text style={{ color: '#FFF', fontWeight: '700' }}>➡ Дальше</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Жить вечно */}
        <Text style={styles.sectionHeader}>Жить вечно</Text>
        <Text style={styles.sectionTitle}>Комната борьбы со страхами</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 0 }}>
          <PositiveCard title="Публичные выступления" subtitle="Ты уверен и спокоен" onPress={() => handlePracticeSelect('Публичные выступления')} color="#FF6B81" />
          <PositiveCard title="Высота" subtitle="Ты смело поднимаешься" onPress={() => handlePracticeSelect('Высота')} color="#FFD93D" />
          <PositiveCard title="Перемены" subtitle="Ты легко адаптируешься" onPress={() => handlePracticeSelect('Перемены')} color="#6BCB77" />
          <PositiveCard title="Нет отказов" subtitle="Ты действуешь смело" onPress={() => handlePracticeSelect('Страх отказа')} color="#FF6B6B" />
          <PositiveCard title="Уверенность в себе" subtitle="Ты знаешь свою ценность" onPress={() => handlePracticeSelect('Сомнения')} color="#4D96FF" />
          <PositiveCard title="Я могу всё" subtitle="Ты способен на большее" onPress={() => handlePracticeSelect('Не могу')} color="#FFD700" />
        </ScrollView>
      </View>

      {/* FAB-кнопки */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEmotion}>
        <Ionicons name="heart-circle" size={40} color="#FF6B6B" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.fabLeft} onPress={handleSharePain}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color="#6C63FF" />
      </TouchableOpacity>

      {/* Футер с профилем */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Модалка */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Поделитесь своей болью</Text>
            <TextInput
              placeholder="Напишите, что вас беспокоит..."
              multiline
              value={painMessage}
              onChangeText={setPainMessage}
              style={styles.modalInput}
            />
            <TouchableOpacity style={styles.modalButton} onPress={sendPainMessage}>
              <Text style={styles.modalButtonText}>Отправить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: { paddingHorizontal: 14, marginBottom: 8 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  painButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1B2F', justifyContent: 'center', alignItems: 'center' },
  emotionMemoryRow: { flexDirection: 'row', alignItems: 'center' },
  memoryBall: { width: 22, height: 22, borderRadius: 11, marginLeft: 6, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 2, elevation: 3 },
  verticalStack: { marginTop: 6, flexDirection: 'column' },
  featureCardHorizontal: { width: 180, height: 140, borderRadius: 16, marginRight: 10, justifyContent: 'flex-start', alignItems: 'center', padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  cardTitleHorizontal: { color: '#FFF', fontSize: 20, fontWeight: '600', textAlign: 'center' },
  cardSubtitleHorizontal: { color: '#FFF', fontSize: 13, textAlign: 'center', marginTop: 2 },
  nextHintHorizontal: { position: 'absolute', bottom: 8, alignSelf: 'center' },
  sectionHeader: { fontSize: 22, fontWeight: '700', color: '#FFF', textAlign: 'left', marginTop: 6, marginBottom: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#AAA', textAlign: 'left', marginBottom: 8 },

  fab: { position: 'absolute', bottom: 70, right: 20, backgroundColor: '#1A1B2F', padding: 10, borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 6 },
  fabLeft: { position: 'absolute', left: 16, bottom: 70, width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },

  footer: { position: 'absolute', bottom: 20, width: width, justifyContent: 'center', alignItems: 'center' },
  profileButton: { width: 54, height: 54, borderRadius: 27, overflow: 'hidden', borderWidth: 2, borderColor: '#6C63FF' },
  profileImage: { width: '100%', height: '100%' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 16, padding: 18 },
  modalTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  modalInput: { borderWidth: 1, borderColor: '#CCC', borderRadius: 12, padding: 8, minHeight: 70, textAlignVertical: 'top', marginBottom: 10 },
  modalButton: { backgroundColor: '#6C63FF', paddingVertical: 8, borderRadius: 12, alignItems: 'center' },
  modalButtonText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
 bg: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,12,28,0.75)', // затемнение под текст
  },

  container: {
    flex: 1,
    paddingTop: 40,
  },
});
