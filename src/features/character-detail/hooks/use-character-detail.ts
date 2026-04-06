import { useEffect, useState } from 'react';

import { type Character } from '../../../shared/types/character';
import { getCharacterDetail } from '../api/get-character-detail';
import { CHARACTER_DETAIL_ERROR_MESSAGE } from '../constants/character-detail.constants';

type UseCharacterDetailResult = {
  character: Character | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function useCharacterDetail(
  characterId: number,
): UseCharacterDetailResult {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCharacterDetail() {
      try {
        const nextCharacter = await getCharacterDetail(characterId);

        if (!isMounted) {
          return;
        }

        setCharacter(nextCharacter);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage(CHARACTER_DETAIL_ERROR_MESSAGE);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCharacterDetail();

    return () => {
      isMounted = false;
    };
  }, [characterId]);

  return {
    character,
    isLoading,
    errorMessage,
  };
}
