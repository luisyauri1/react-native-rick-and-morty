import { useQuery } from '@tanstack/react-query';

import { type Character } from '../../../shared/types/character';
import { HOME_CHARACTERS_ERROR_MESSAGE } from '../constants/home.constants';
import { homeCharactersQueryOptions } from '../queries/home-characters-query';
import { type HomeCharactersFilters } from '../types/home-characters-filters';

type UseHomeCharactersResult = {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useHomeCharacters(
  filters: HomeCharactersFilters,
): UseHomeCharactersResult {
  const { data, isLoading, error } = useQuery(
    homeCharactersQueryOptions(filters),
  );

  return {
    characters: data ?? [],
    isLoading,
    errorMessage: error ? HOME_CHARACTERS_ERROR_MESSAGE : null,
  };
}
