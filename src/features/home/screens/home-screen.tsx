import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { CHARACTER_DETAIL_ROUTE_NAME } from '../../../app/navigation/route-names';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { characterDetailQueryOptions } from '../../character-detail/queries/character-detail-query';
import { type Character } from '../../../shared/types/character';
import { buildCharacterDetailRouteParams } from '../../character-detail/utils/build-character-detail-route-params';
import { HomeCharactersCard } from '../components/home-characters-card';
import { HomeFilters } from '../components/home-filters';
import { HomeHeader } from '../components/home-header';
import { DEFAULT_HOME_CHARACTERS_FILTERS } from '../constants/home.constants';
import { useHomeCharacters } from '../hooks/use-home-characters';
import { type HomeCharacterStatusFilter } from '../types/home-characters-filters';

export function HomeScreen() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState(
    DEFAULT_HOME_CHARACTERS_FILTERS.search,
  );
  const [selectedStatus, setSelectedStatus] =
    useState<HomeCharacterStatusFilter>(DEFAULT_HOME_CHARACTERS_FILTERS.status);
  const { characters, isLoading, errorMessage } = useHomeCharacters({
    search: searchValue,
    status: selectedStatus,
  });

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
      <HomeFilters
        onChangeSearch={setSearchValue}
        onChangeStatus={setSelectedStatus}
        searchValue={searchValue}
        selectedStatus={selectedStatus}
      />
      <HomeCharactersCard
        characters={characters}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onPressCharacter={handlePressCharacter}
      />
    </ScreenLayout>
  );
}
