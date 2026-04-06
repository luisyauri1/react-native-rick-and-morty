export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type CharacterOrigin = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  gender: CharacterGender;
  species: string;
  origin: CharacterOrigin;
  image: string;
};
