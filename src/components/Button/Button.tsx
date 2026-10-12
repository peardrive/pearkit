import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
};

export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#64748b' },
  text: { color: '#fff', fontWeight: '600' },
});