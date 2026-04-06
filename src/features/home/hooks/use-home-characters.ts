import { useEffect, useState } from 'react';

import { type Character } from '../../../shared/types/character';
import { getHomeCharacters } from '../api/get-home-characters';
import { HOME_CHARACTERS_ERROR_MESSAGE } from '../constants/home.constants';

type UseHomeCharactersResult = {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useHomeCharacters(): UseHomeCharactersResult {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCharacters() {
      try {
        const nextCharacters = await getHomeCharacters();

        if (!isMounted) {
          return;
        }

        setCharacters(nextCharacters);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage(HOME_CHARACTERS_ERROR_MESSAGE);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    characters,
    isLoading,
    errorMessage,
  };
}
