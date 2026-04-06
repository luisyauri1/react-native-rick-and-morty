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
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(character)}
      style={styles.characterRow}
      testID={`home-character-pressable-${character.id}`}
    >
      <Image
        source={{ uri: character.image }}
        style={styles.characterImage}
        testID={`home-character-image-${character.id}`}
      />
      <View style={styles.characterContent}>
        <Text style={styles.characterName} testID={`home-character-${character.id}`}>
          {character.name}
        </Text>
        <Text
          style={styles.characterMeta}
          testID={`home-character-meta-${character.id}`}
        >
          {formatCharacterMeta(character)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  characterImage: {
    width: 56,
    height: 56,
    marginRight: 16,
    borderRadius: 28,
  },
  characterContent: {
    flex: 1,
  },
});
