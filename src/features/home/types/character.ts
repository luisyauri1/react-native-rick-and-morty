export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
};
