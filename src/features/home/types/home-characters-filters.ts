export type HomeCharacterStatusFilter = 'all' | 'alive' | 'dead' | 'unknown';

export type HomeCharactersFilters = {
  search: string;
  status: HomeCharacterStatusFilter;
};
