import { QueryClient } from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';
import { homeCharactersQueryOptions } from './home-characters-query';

jest.mock('../api/get-home-characters', () => ({
  getHomeCharacters: jest.fn(),
}));

const getHomeCharactersMock =
  getHomeCharacters as jest.MockedFunction<typeof getHomeCharacters>;

describe('homeCharactersQueryOptions', () => {
  afterEach(() => {
    getHomeCharactersMock.mockReset();
  });

  test('returns the home characters query key', () => {
    // Arrange

    // Act
    const options = homeCharactersQueryOptions();

    // Assert
    expect(options.queryKey).toEqual(['home-characters']);
  });

  test('uses the home characters request as query function', async () => {
    // Arrange
    const queryClient = new QueryClient();
    getHomeCharactersMock.mockResolvedValue([]);

    // Act
    await queryClient.fetchQuery(homeCharactersQueryOptions());

    // Assert
    expect(getHomeCharactersMock).toHaveBeenCalledTimes(1);
  });
});
