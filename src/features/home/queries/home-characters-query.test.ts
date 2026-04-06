import { QueryClient } from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';
import {
  HOME_CHARACTERS_STALE_TIME_MS,
  homeCharactersQueryOptions,
} from './home-characters-query';

jest.mock('../api/get-home-characters', () => ({
  getHomeCharacters: jest.fn(),
}));

const getHomeCharactersMock =
  getHomeCharacters as jest.MockedFunction<typeof getHomeCharacters>;

const defaultFilters = {
  search: '',
  status: 'all',
} as const;

describe('homeCharactersQueryOptions', () => {
  afterEach(() => {
    getHomeCharactersMock.mockReset();
  });

  test('returns the home characters query key with normalized filters', () => {
    // Arrange

    // Act
    const options = homeCharactersQueryOptions({
      search: '  rick  ',
      status: 'alive',
    });

    // Assert
    expect(options.queryKey).toEqual([
      'home-characters',
      {
        search: 'rick',
        status: 'alive',
      },
    ]);
  });

  test('returns the configured stale time', () => {
    // Arrange

    // Act
    const options = homeCharactersQueryOptions(defaultFilters);

    // Assert
    expect(options.staleTime).toBe(HOME_CHARACTERS_STALE_TIME_MS);
  });

  test('uses the home characters request as query function with normalized filters', async () => {
    // Arrange
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: Infinity,
        },
      },
    });
    getHomeCharactersMock.mockResolvedValue([]);

    // Act
    await queryClient.fetchQuery(
      homeCharactersQueryOptions({
        search: '  morty  ',
        status: 'dead',
      }),
    );

    // Assert
    expect(getHomeCharactersMock).toHaveBeenCalledWith({
      search: 'morty',
      status: 'dead',
    });
  });
});
