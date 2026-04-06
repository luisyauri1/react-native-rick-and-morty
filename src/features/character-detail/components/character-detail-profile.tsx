import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { type Character } from '../../../shared/types/character';
import {
  CHARACTER_DETAIL_GENDER_LABEL,
  CHARACTER_DETAIL_ORIGIN_LABEL,
  CHARACTER_DETAIL_PROFILE_BADGE_TEXT,
  CHARACTER_DETAIL_SPECIES_LABEL,
  CHARACTER_DETAIL_STATUS_LABEL,
} from '../constants/character-detail.constants';

type CharacterDetailProfileProps = {
  character: Character;
};

export function CharacterDetailProfile({
  character,
}: CharacterDetailProfileProps) {
  return (
    <>
      <View style={styles.badge}>
        <Text style={styles.badgeText} testID="character-detail-badge-text">
          {CHARACTER_DETAIL_PROFILE_BADGE_TEXT}
        </Text>
      </View>
      <Image
        source={{ uri: character.image }}
        style={styles.image}
        testID="character-detail-image"
      />
      <Text style={styles.name} testID="character-detail-name">
        {character.name}
      </Text>
      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel} testID="character-detail-status-label">
            {CHARACTER_DETAIL_STATUS_LABEL}
          </Text>
          <Text style={styles.metaValue} testID="character-detail-status">
            {character.status}
          </Text>
        </View>
        <View style={styles.metaCard}>
          <Text
            style={styles.metaLabel}
            testID="character-detail-species-label"
          >
            {CHARACTER_DETAIL_SPECIES_LABEL}
          </Text>
          <Text style={styles.metaValue} testID="character-detail-species">
            {character.species}
          </Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel} testID="character-detail-gender-label">
            {CHARACTER_DETAIL_GENDER_LABEL}
          </Text>
          <Text style={styles.metaValue} testID="character-detail-gender">
            {character.gender}
          </Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel} testID="character-detail-origin-label">
            {CHARACTER_DETAIL_ORIGIN_LABEL}
          </Text>
          <Text style={styles.metaValue} testID="character-detail-origin">
            {character.origin.name}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
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
  image: {
    width: 144,
    height: 144,
    marginBottom: 20,
    borderRadius: 72,
    borderWidth: 3,
    borderColor: colors.border,
  },
  name: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  metaGrid: {
    marginTop: 12,
    gap: 12,
  },
  metaCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 16,
  },
  metaLabel: {
    marginBottom: 6,
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
