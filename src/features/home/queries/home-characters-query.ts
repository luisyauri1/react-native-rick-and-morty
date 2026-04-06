import { queryOptions } from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';

export const HOME_CHARACTERS_STALE_TIME_MS = 60 * 1000;

export function homeCharactersQueryOptions() {
  return queryOptions({
    queryKey: ['home-characters'],
    queryFn: getHomeCharacters,
    staleTime: HOME_CHARACTERS_STALE_TIME_MS,
  });
}
