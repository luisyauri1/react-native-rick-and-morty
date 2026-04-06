import { queryOptions } from '@tanstack/react-query';

import { getCharacterDetail } from '../api/get-character-detail';

export function characterDetailQueryOptions(characterId: number) {
  return queryOptions({
    queryKey: ['character-detail', characterId],
    queryFn: () => getCharacterDetail(characterId),
  });
}
