import { useQuery } from '@tanstack/react-query';

import { type Character } from '../../../shared/types/character';
import { CHARACTER_DETAIL_ERROR_MESSAGE } from '../constants/character-detail.constants';
import { characterDetailQueryOptions } from '../queries/character-detail-query';

type UseCharacterDetailResult = {
  character: Character | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function useCharacterDetail(
  characterId: number,
): UseCharacterDetailResult {
  const { data, isLoading, error } = useQuery(
    characterDetailQueryOptions(characterId),
  );

  return {
    character: data ?? null,
    isLoading,
    errorMessage: error ? CHARACTER_DETAIL_ERROR_MESSAGE : null,
  };
}
