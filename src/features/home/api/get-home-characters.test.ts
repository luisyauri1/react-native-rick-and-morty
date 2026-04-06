import { getJson } from '../../../shared/api/http-client';

import { getHomeCharacters } from './get-home-characters';

jest.mock('../../../shared/api/http-client', () => ({
  getJson: jest.fn(),
}));

const getJsonMock = getJson as jest.MockedFunction<typeof getJson>;

describe('getHomeCharacters', () => {
  afterEach(() => {
    getJsonMock.mockReset();
  });

  test('calls the character endpoint', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    await getHomeCharacters();

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character');
  });

  test('returns only the first five characters', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
        { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' },
        { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human' },
        { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human' },
        { id: 5, name: 'Jerry Smith', status: 'Alive', species: 'Human' },
        {
          id: 6,
          name: 'Abadango Cluster Princess',
          status: 'Alive',
          species: 'Alien',
        },
      ],
    });

    // Act
    const result = await getHomeCharacters();

    // Assert
    expect(result).toEqual([
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' },
      { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human' },
      { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human' },
      { id: 5, name: 'Jerry Smith', status: 'Alive', species: 'Human' },
    ]);
  });
});
