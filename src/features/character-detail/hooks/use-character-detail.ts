import { useEffect, useState } from 'react';

import { getCharacterDetail } from '../api/get-character-detail';
import { type CharacterDetail } from '../types/character-detail';

type UseCharacterDetailResult = {
  character: CharacterDetail | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function useCharacterDetail(
  characterId: number,
): UseCharacterDetailResult {
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
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

        setErrorMessage('No pudimos cargar el detalle del personaje.');
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
