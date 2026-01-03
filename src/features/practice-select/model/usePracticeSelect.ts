import { Alert } from 'react-native';

export const usePracticeSelect = () => {
  const selectPractice = (title: string) => {
    Alert.alert('Практика', `Ты уже работаешь с темой: ${title}`);
  };

  return { selectPractice };
};
