import { queryOptions } from '@tanstack/react-query';

import { getCharacterDetail } from '../api/get-character-detail';

export const CHARACTER_DETAIL_STALE_TIME_MS = 60 * 1000;

export function characterDetailQueryOptions(characterId: number) {
  return queryOptions({
    queryKey: ['character-detail', characterId],
    queryFn: () => getCharacterDetail(characterId),
    staleTime: CHARACTER_DETAIL_STALE_TIME_MS,
  });
}
