import { queryOptions } from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';

export function homeCharactersQueryOptions() {
  return queryOptions({
    queryKey: ['home-characters'],
    queryFn: getHomeCharacters,
  });
}
