import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import {
  getHomeCharacters,
  type Character,
} from '../api/get-home-characters';

export function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCharacters() {
      try {
        const nextCharacters = await getHomeCharacters();

        if (!isMounted) {
          return;
        }

        setCharacters(nextCharacters);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage('No pudimos cargar personajes.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      // Prevents state updates if the screen unmounts before the request ends.
      isMounted = false;
    };
  }, []);

  return (
    <ScreenLayout>
      <Text style={styles.title}>The Rick and Morty API</Text>
      <Text style={styles.subtitle}>Home</Text>

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
              <Text
                key={character.id}
                style={styles.characterName}
                testID={`home-character-${character.id}`}
              >
                {character.name}
              </Text>
            ))
          : null}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 28,
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
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
});
