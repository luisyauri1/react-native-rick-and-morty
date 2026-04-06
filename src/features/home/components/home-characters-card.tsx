import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { type Character } from '../../../shared/types/character';
import { SurfaceCard } from '../../../shared/ui/surface-card';
import { colors } from '../../../shared/theme/colors';
import {
  HOME_CARD_TITLE,
  HOME_EMPTY_MESSAGE,
  HOME_LOADING_MESSAGE,
} from '../constants/home.constants';
import { HomeCharacterItem } from './home-character-item';

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
    <SurfaceCard testID="home-characters-card">
      <View style={styles.header}>
        <View>
          <Text style={styles.cardEyebrow}>Results</Text>
          <Text style={styles.cardTitle} testID="home-card-title">
            {HOME_CARD_TITLE}
          </Text>
        </View>

        {!isLoading && !errorMessage ? (
          <View style={styles.countBadge}>
            <Text style={styles.countText} testID="home-results-count">
              {characters.length}
            </Text>
          </View>
        ) : null}
      </View>

      {isLoading ? (
        <View style={styles.feedbackPanel}>
          <Text style={styles.cardDescription} testID="home-loading">
            {HOME_LOADING_MESSAGE}
          </Text>
        </View>
      ) : null}

      {errorMessage ? (
        <View style={styles.feedbackPanel}>
          <Text style={styles.cardDescription} testID="home-error">
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && characters.length === 0 ? (
        <View style={styles.feedbackPanel}>
          <Text style={styles.cardDescription} testID="home-empty">
            {HOME_EMPTY_MESSAGE}
          </Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && characters.length > 0
        ? characters.map(character => (
            <HomeCharacterItem
              key={character.id}
              character={character}
              onPress={onPressCharacter}
            />
          ))
        : null}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardEyebrow: {
    marginBottom: 6,
    color: '#7ea1c5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  countBadge: {
    minWidth: 42,
    borderRadius: 999,
    backgroundColor: 'rgba(216, 255, 114, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  countText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  feedbackPanel: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0a1829',
    padding: 16,
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
