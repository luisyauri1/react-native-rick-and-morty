import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { colors } from '../../../shared/theme/colors';

export function HomeScreen() {
  return (
    <ScreenLayout>
      <Text style={styles.title}>The Rick and Morty API</Text>
      <Text style={styles.subtitle}>Home</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bienvenido</Text>
        <Text style={styles.cardDescription}>
          La navegación ya está conectada y la estructura quedó separada por
          features para seguir escalando la app.
        </Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 28,
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
  },
  cardTitle: {
    marginBottom: 12,
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
