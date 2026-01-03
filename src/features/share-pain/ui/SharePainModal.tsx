import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSharePain } from '../model/useSharePain';

export const SharePainModal = () => {
  const { visible, message, setMessage, close, send } = useSharePain();

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Поделитесь болью</Text>

          <TextInput
            multiline
            value={message}
            onChangeText={setMessage}
            placeholder="Напишите, что сейчас тяжело..."
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={send}>
            <Text style={styles.buttonText}>Отправить</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={close}>
            <Text style={styles.cancel}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 8,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  cancel: {
    marginTop: 10,
    textAlign: 'center',
    color: '#999',
  },
});
