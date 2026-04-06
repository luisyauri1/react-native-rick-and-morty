import { getJson } from '../../../shared/api/http-client';

export type Character = {
  id: number;
  name: string;
};

type CharacterListResponse = {
  results: Character[];
};

export async function getHomeCharacters(): Promise<Character[]> {
  const response = await getJson<CharacterListResponse>('/character');

  return response.results.slice(0, 5);
}
