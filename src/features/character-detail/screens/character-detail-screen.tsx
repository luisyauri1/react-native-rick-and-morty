import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { type StaticScreenProps } from '@react-navigation/native';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { colors } from '../../../shared/theme/colors';
import { useCharacterDetail } from '../hooks/use-character-detail';

type Props = StaticScreenProps<{
  characterId: number;
}>;

export function CharacterDetailScreen({ route }: Props) {
  const { character, isLoading, errorMessage } = useCharacterDetail(
    route.params.characterId,
  );

  return (
    <ScreenLayout>
      <View style={styles.card}>
        <Text style={styles.title}>Character Detail</Text>

        {isLoading ? (
          <Text style={styles.description} testID="character-detail-loading">
            Cargando detalle...
          </Text>
        ) : null}

        {errorMessage ? (
          <Text style={styles.description} testID="character-detail-error">
            {errorMessage}
          </Text>
        ) : null}

        {!isLoading && !errorMessage && character ? (
          <>
            <Image
              source={{ uri: character.image }}
              style={styles.image}
              testID="character-detail-image"
            />
            <Text style={styles.name} testID="character-detail-name">
              {character.name}
            </Text>
            <Text style={styles.description} testID="character-detail-meta">
              {character.status} - {character.species}
            </Text>
          </>
        ) : null}
      </View>
    </ScreenLayout>
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
  title: {
    marginBottom: 12,
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 60,
  },
});
