import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { type StaticScreenProps } from '@react-navigation/native';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { colors } from '../../../shared/theme/colors';

type Props = StaticScreenProps<{
  characterId: number;
}>;

export function CharacterDetailScreen({ route }: Props) {
  return (
    <ScreenLayout>
      <View style={styles.card}>
        <Text style={styles.title}>Character Detail</Text>
        <Text style={styles.description} testID="character-detail-id">
          Character id: {route.params.characterId}
        </Text>
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
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
