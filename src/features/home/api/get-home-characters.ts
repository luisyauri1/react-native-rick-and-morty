import { getJson, HttpRequestError } from '../../../shared/api/http-client';
import { type Character } from '../../../shared/types/character';
import { HOME_CHARACTER_LIMIT } from '../constants/home.constants';
import { type HomeCharactersFilters } from '../types/home-characters-filters';

type CharacterListResponse = {
  results: Character[];
};

function buildCharacterPath(filters: HomeCharactersFilters) {
  const searchParams = new URLSearchParams();
  const normalizedSearch = filters.search.trim();

  if (normalizedSearch) {
    searchParams.append('name', normalizedSearch);
  }

  if (filters.status !== 'all') {
    searchParams.append('status', filters.status);
  }

  const queryString = searchParams.toString();

  if (!queryString) {
    return '/character';
  }

  return `/character?${queryString}`;
}

export async function getHomeCharacters(
  filters: HomeCharactersFilters,
): Promise<Character[]> {
  try {
    const response = await getJson<CharacterListResponse>(
      buildCharacterPath(filters),
    );

    return response.results.slice(0, HOME_CHARACTER_LIMIT);
  } catch (error) {
    if (error instanceof HttpRequestError && error.status === 404) {
      return [];
    }

    throw error;
  }
}
