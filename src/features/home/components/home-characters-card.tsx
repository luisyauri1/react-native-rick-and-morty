import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { type Character } from '../../../shared/types/character';
import { SurfaceCard } from '../../../shared/ui/surface-card';
import { colors } from '../../../shared/theme/colors';
import {
  HOME_CARD_TITLE,
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
    <SurfaceCard>
      <Text style={styles.cardTitle}>{HOME_CARD_TITLE}</Text>

      {isLoading ? (
        <Text style={styles.cardDescription} testID="home-loading">
          {HOME_LOADING_MESSAGE}
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
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
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
