import { type Character } from '../../../shared/types/character';
import { type CharacterDetailRouteParams } from '../types/character-detail-route-params';

type CharacterIdentifier = Pick<Character, 'id'>;

export function buildCharacterDetailRouteParams(
  character: CharacterIdentifier,
): CharacterDetailRouteParams {
  return {
    characterId: character.id,
  };
}
