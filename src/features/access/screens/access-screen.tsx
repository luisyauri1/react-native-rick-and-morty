import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PrimaryButton } from '../../../shared/ui/primary-button';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { colors } from '../../../shared/theme/colors';

export function AccessScreen() {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Feature-based architecture</Text>
      </View>

      <Text style={styles.title}>The Rick and Morty API</Text>
      <Text style={styles.description}>
        Una entrada simple con rutas para separar la pantalla inicial de la
        home principal.
      </Text>

      <PrimaryButton
        label="Ingresa"
        onPress={() => navigation.navigate('Home')}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 16,
    color: colors.text,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 46,
  },
  description: {
    marginBottom: 32,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
