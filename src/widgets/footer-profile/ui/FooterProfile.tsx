import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const FooterProfile = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width,
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#6C63FF',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
