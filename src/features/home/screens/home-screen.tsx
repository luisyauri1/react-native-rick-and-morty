import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { type Character } from '../../../shared/types/character';
import { HomeCharactersCard } from '../components/home-characters-card';
import { HomeHeader } from '../components/home-header';
import { useHomeCharacters } from '../hooks/use-home-characters';

export function HomeScreen() {
  const navigation = useNavigation();
  const { characters, isLoading, errorMessage } = useHomeCharacters();

  function handlePressCharacter(character: Character) {
    navigation.navigate('CharacterDetail', {
      characterId: character.id,
    });
  }

  return (
    <ScreenLayout>
      <HomeHeader />
      <HomeCharactersCard
        characters={characters}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onPressCharacter={handlePressCharacter}
      />
    </ScreenLayout>
  );
}
