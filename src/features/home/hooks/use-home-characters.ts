import { useEffect, useState } from 'react';

import { getHomeCharacters } from '../api/get-home-characters';
import { type Character } from '../types/character';

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

        setErrorMessage('No pudimos cargar personajes.');
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
