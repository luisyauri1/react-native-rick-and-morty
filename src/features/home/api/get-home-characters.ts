import { getJson } from '../../../shared/api/http-client';
import { type Character } from '../../../shared/types/character';
import { HOME_CHARACTER_LIMIT } from '../constants/home.constants';

type CharacterListResponse = {
  results: Character[];
};

export async function getHomeCharacters(): Promise<Character[]> {
  const response = await getJson<CharacterListResponse>('/character');

  return response.results.slice(0, HOME_CHARACTER_LIMIT);
}
