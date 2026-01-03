import { Alert } from 'react-native';

type EmotionEntry = {
  situation: string;
  emotion?: string;
};

export const useAddEmotion = () => {
  const addEmotion = (onSave?: (entry: EmotionEntry) => void) => {
    Alert.prompt(
      'Новая эмоция',
      'Формат: ситуация | эмоция\nПример: Меня перебили | злость',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Сохранить',
          onPress: input => {
            if (!input) return;

            const [situation, emotion] = input
              .split('|')
              .map(v => v.trim());

            const entry: EmotionEntry = { situation, emotion };

            onSave?.(entry);

            Alert.alert(
              'Сохранено',
              emotion
                ? `Эмоция "${emotion}" может быть связана с прошлым опытом`
                : 'Эмоция сохранена'
            );
          },
        },
      ],
      'plain-text'
    );
  };

  return { addEmotion };
};
