import React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
  size?: number;
  muted?: boolean;
};

export const Text = ({ children, size = 18, muted }: Props) => (
  <RNText style={[styles.text, { fontSize: size }, muted && styles.muted]}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: { color: '#F5F5F5', lineHeight: 26 },
  muted: { opacity: 0.6 },
});
