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
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        },
        {
          id: 3,
          name: 'Summer Smith',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
        },
        {
          id: 4,
          name: 'Beth Smith',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
        },
        {
          id: 5,
          name: 'Jerry Smith',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
        },
        {
          id: 6,
          name: 'Abadango Cluster Princess',
          status: 'Alive',
          species: 'Alien',
          image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
        },
      ],
    });

    // Act
    const result = await getHomeCharacters();

    // Assert
    expect(result).toEqual([
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      },
      {
        id: 3,
        name: 'Summer Smith',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      },
      {
        id: 4,
        name: 'Beth Smith',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
      },
      {
        id: 5,
        name: 'Jerry Smith',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
      },
    ]);
  });
});
