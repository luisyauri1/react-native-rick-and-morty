import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { type StaticScreenProps } from '@react-navigation/native';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { SurfaceCard } from '../../../shared/ui/surface-card';
import { colors } from '../../../shared/theme/colors';
import { CharacterDetailProfile } from '../components/character-detail-profile';
import {
  CHARACTER_DETAIL_LOADING_MESSAGE,
  CHARACTER_DETAIL_TITLE,
} from '../constants/character-detail.constants';
import { useCharacterDetail } from '../hooks/use-character-detail';
import { type CharacterDetailRouteParams } from '../types/character-detail-route-params';

type Props = StaticScreenProps<CharacterDetailRouteParams>;

export function CharacterDetailScreen({ route }: Props) {
  const { character, isLoading, errorMessage } = useCharacterDetail(
    route.params.characterId,
  );

  return (
    <ScreenLayout withTopInset={false}>
      <SurfaceCard>
        <Text style={styles.title}>{CHARACTER_DETAIL_TITLE}</Text>

        {isLoading ? (
          <Text style={styles.description} testID="character-detail-loading">
            {CHARACTER_DETAIL_LOADING_MESSAGE}
          </Text>
        ) : null}

        {errorMessage ? (
          <Text style={styles.description} testID="character-detail-error">
            {errorMessage}
          </Text>
        ) : null}

        {!isLoading && !errorMessage && character ? (
          <CharacterDetailProfile character={character} />
        ) : null}
      </SurfaceCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
