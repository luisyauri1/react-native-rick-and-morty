import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { HomeCharacterItem } from './home-character-item';
import { type Character } from '../types/character';

type HomeCharactersCardProps = {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
  onPressCharacter: (character: Character) => void;
};

export function HomeCharactersCard({
  characters,
  isLoading,
  errorMessage,
  onPressCharacter,
}: HomeCharactersCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Primeros personajes</Text>

      {isLoading ? (
        <Text style={styles.cardDescription} testID="home-loading">
          Cargando personajes...
        </Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.cardDescription} testID="home-error">
          {errorMessage}
        </Text>
      ) : null}

      {!isLoading && !errorMessage
        ? characters.map(character => (
            <HomeCharacterItem
              key={character.id}
              character={character}
              onPress={onPressCharacter}
            />
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
