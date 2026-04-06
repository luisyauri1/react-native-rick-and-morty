export type CharacterDetailStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterDetail = {
  id: number;
  name: string;
  status: CharacterDetailStatus;
  species: string;
  image: string;
};
