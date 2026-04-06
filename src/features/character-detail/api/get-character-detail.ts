import { getJson } from '../../../shared/api/http-client';
import { type CharacterDetail } from '../types/character-detail';

export async function getCharacterDetail(
  characterId: number,
): Promise<CharacterDetail> {
  return getJson<CharacterDetail>(`/character/${characterId}`);
}
