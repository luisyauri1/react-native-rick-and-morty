import React from 'react';

import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { HomeCharactersCard } from '../components/home-characters-card';
import { HomeHeader } from '../components/home-header';
import { useHomeCharacters } from '../hooks/use-home-characters';

export function HomeScreen() {
  const { characters, isLoading, errorMessage } = useHomeCharacters();

  return (
    <ScreenLayout>
      <HomeHeader />
      <HomeCharactersCard
        characters={characters}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </ScreenLayout>
  );
}
