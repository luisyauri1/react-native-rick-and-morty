import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { type Character } from '../types/character';

type HomeCharactersCardProps = {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function HomeCharactersCard({
  characters,
  isLoading,
  errorMessage,
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
            <View key={character.id} style={styles.characterRow}>
              <Text
                style={styles.characterName}
                testID={`home-character-${character.id}`}
              >
                {character.name}
              </Text>
              <Text
                style={styles.characterMeta}
                testID={`home-character-meta-${character.id}`}
              >
                {character.status} - {character.species}
              </Text>
            </View>
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
  characterName: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  characterMeta: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  characterRow: {
    marginBottom: 12,
  },
});
