import { type Character } from '../../../shared/types/character';
import { HOME_CHARACTER_META_SEPARATOR } from '../constants/home.constants';

type CharacterMeta = Pick<Character, 'status' | 'species'>;

export function formatCharacterMeta(character: CharacterMeta) {
  return `${character.status}${HOME_CHARACTER_META_SEPARATOR}${character.species}`;
}
