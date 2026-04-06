import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { HomeCharactersCard } from '../components/home-characters-card';
import { useHomeCharacters } from '../hooks/use-home-characters';

export function HomeScreen() {
  const { characters, isLoading, errorMessage } = useHomeCharacters();

  return (
    <ScreenLayout>
      <Text style={styles.title}>The Rick and Morty API</Text>
      <Text style={styles.subtitle}>Home</Text>
      <HomeCharactersCard
        characters={characters}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
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
});
