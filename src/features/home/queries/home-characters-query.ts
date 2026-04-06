import { queryOptions } from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';
import { type HomeCharactersFilters } from '../types/home-characters-filters';

export const HOME_CHARACTERS_STALE_TIME_MS = 60 * 1000;

export function homeCharactersQueryOptions(filters: HomeCharactersFilters) {
  const normalizedFilters = {
    search: filters.search.trim(),
    status: filters.status,
  } as const;

  return queryOptions({
    queryKey: ['home-characters', normalizedFilters],
    queryFn: () => getHomeCharacters(normalizedFilters),
    staleTime: HOME_CHARACTERS_STALE_TIME_MS,
  });
}
