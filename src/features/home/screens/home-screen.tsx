import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { CHARACTER_DETAIL_ROUTE_NAME } from '../../../app/navigation/route-names';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { characterDetailQueryOptions } from '../../character-detail/queries/character-detail-query';
import { type Character } from '../../../shared/types/character';
import { buildCharacterDetailRouteParams } from '../../character-detail/utils/build-character-detail-route-params';
import { HomeCharactersCard } from '../components/home-characters-card';
import { HomeHeader } from '../components/home-header';
import { useHomeCharacters } from '../hooks/use-home-characters';

export function HomeScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { characters, isLoading, errorMessage } = useHomeCharacters();

  function handlePressCharacter(character: Character) {
    queryClient.prefetchQuery(characterDetailQueryOptions(character.id));

    navigation.navigate(
      CHARACTER_DETAIL_ROUTE_NAME,
      buildCharacterDetailRouteParams(character),
    );
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
