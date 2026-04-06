import { APP_TITLE } from '../../../shared/constants/app.constants';
import { type HomeCharactersFilters } from '../types/home-characters-filters';

export const HOME_SCREEN_TITLE = APP_TITLE;
export const HOME_SCREEN_SUBTITLE = 'Home';
export const HOME_SCREEN_DESCRIPTION =
  'A polished character directory with quick search, precise filters, and fast detail previews.';
export const HOME_HEADER_BADGE_TEXT = 'Character directory';
export const HOME_RESULTS_LABEL = 'Visible now';
export const HOME_ACTIVE_FILTER_LABEL = 'Current focus';
export const HOME_ACTIVE_FILTER_ALL_VALUE = 'All characters';
export const HOME_CARD_TITLE = 'Primeros personajes';
export const HOME_LOADING_MESSAGE = 'Cargando personajes...';
export const HOME_CHARACTER_LIMIT = 5;
export const HOME_CHARACTER_META_SEPARATOR = ' - ';
export const HOME_EMPTY_MESSAGE = 'No encontramos personajes.';
export const HOME_CHARACTERS_ERROR_MESSAGE =
  'No pudimos cargar personajes.';
export const HOME_SEARCH_PLACEHOLDER = 'Busca por nombre';
export const HOME_FILTERS_TITLE = 'Refina resultados';
export const HOME_FILTERS_DESCRIPTION =
  'Busca por nombre y reduce el listado por estado.';
export const HOME_FILTER_ALL_LABEL = 'Todos';
export const HOME_FILTER_ALIVE_LABEL = 'Alive';
export const HOME_FILTER_DEAD_LABEL = 'Dead';
export const HOME_FILTER_UNKNOWN_LABEL = 'Unknown';
export const DEFAULT_HOME_CHARACTERS_FILTERS: HomeCharactersFilters = {
  search: '',
  status: 'all',
};
