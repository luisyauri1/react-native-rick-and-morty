import { getJson } from '../../../shared/api/http-client';
import { type Character } from '../../../shared/types/character';

export async function getCharacterDetail(
  characterId: number,
): Promise<Character> {
  return getJson<Character>(`/character/${characterId}`);
}
