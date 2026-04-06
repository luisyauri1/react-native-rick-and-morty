import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { type Character } from '../../../shared/types/character';
import { formatCharacterMeta } from '../utils/format-character-meta';

type HomeCharacterItemProps = {
  character: Character;
  onPress: (character: Character) => void;
};

export function HomeCharacterItem({
  character,
  onPress,
}: HomeCharacterItemProps) {
  const statusTone =
    character.status === 'Alive'
      ? styles.statusDotAlive
      : character.status === 'Dead'
        ? styles.statusDotDead
        : styles.statusDotUnknown;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(character)}
      style={({ pressed }) => [
        styles.characterRow,
        pressed ? styles.characterRowPressed : null,
      ]}
      testID={`home-character-pressable-${character.id}`}
    >
      <Image
        source={{ uri: character.image }}
        style={styles.characterImage}
        testID={`home-character-image-${character.id}`}
      />
      <View style={styles.characterContent}>
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, statusTone]} />
          <Text style={styles.statusText}>{character.status}</Text>
        </View>

        <Text style={styles.characterName} testID={`home-character-${character.id}`}>
          {character.name}
        </Text>
        <Text
          style={styles.characterMeta}
          testID={`home-character-meta-${character.id}`}
        >
          {formatCharacterMeta(character)}
        </Text>
        <Text style={styles.actionLabel}>Open profile</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  characterName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  characterMeta: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  characterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0a1829',
    padding: 14,
  },
  characterRowPressed: {
    transform: [{ scale: 0.99 }],
    borderColor: 'rgba(216, 255, 114, 0.24)',
  },
  characterImage: {
    width: 72,
    height: 72,
    marginRight: 14,
    borderRadius: 18,
  },
  characterContent: {
    flex: 1,
  },
  statusPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  statusDotAlive: {
    backgroundColor: '#7df59b',
  },
  statusDotDead: {
    backgroundColor: '#ff7f7f',
  },
  statusDotUnknown: {
    backgroundColor: '#f2cf6f',
  },
  statusText: {
    color: '#d8e7f7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  actionLabel: {
    marginTop: 10,
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
