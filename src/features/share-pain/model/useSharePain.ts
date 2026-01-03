import { useState } from 'react';
import { Alert } from 'react-native';

export const useSharePain = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const send = () => {
    if (!message.trim()) {
      Alert.alert('Пусто', 'Опишите, что вас беспокоит');
      return;
    }

    console.log('Pain message:', message);

    setMessage('');
    setVisible(false);

    Alert.alert('Отправлено', 'Спасибо за доверие');
  };

  return {
    visible,
    message,
    setMessage,
    open,
    close,
    send,
  };
};
