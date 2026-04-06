import { getJson } from '../../../shared/api/http-client';
import { HOME_CHARACTER_LIMIT } from '../constants/home.constants';
import { type Character } from '../types/character';

type CharacterListResponse = {
  results: Character[];
};

export async function getHomeCharacters(): Promise<Character[]> {
  const response = await getJson<CharacterListResponse>('/character');

  return response.results.slice(0, HOME_CHARACTER_LIMIT);
}
