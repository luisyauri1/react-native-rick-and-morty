import { getJson, HttpRequestError } from '../../../shared/api/http-client';

import { getHomeCharacters } from './get-home-characters';

jest.mock('../../../shared/api/http-client', () => {
  const actual = jest.requireActual('../../../shared/api/http-client');

  return {
    ...actual,
    getJson: jest.fn(),
  };
});

const getJsonMock = getJson as jest.MockedFunction<typeof getJson>;

const defaultFilters = {
  search: '',
  status: 'all',
} as const;

const sixCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    gender: 'Female',
    species: 'Human',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  },
  {
    id: 4,
    name: 'Beth Smith',
    status: 'Alive',
    gender: 'Female',
    species: 'Human',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
  {
    id: 5,
    name: 'Jerry Smith',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
  },
  {
    id: 6,
    name: 'Abadango Cluster Princess',
    status: 'Alive',
    gender: 'Female',
    species: 'Alien',
    origin: {
      name: 'Abadango',
      url: 'https://rickandmortyapi.com/api/location/2',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
  },
];

describe('getHomeCharacters', () => {
  afterEach(() => {
    getJsonMock.mockReset();
  });

  test('calls the base character endpoint when no filters are selected', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    await getHomeCharacters(defaultFilters);

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character');
  });

  test('calls the character endpoint with the trimmed search value', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    await getHomeCharacters({
      search: '  morty  ',
      status: 'all',
    });

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character?name=morty');
  });

  test('calls the character endpoint with the selected status filter', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    await getHomeCharacters({
      search: '',
      status: 'dead',
    });

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character?status=dead');
  });

  test('calls the character endpoint with search and status filters', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    await getHomeCharacters({
      search: 'rick',
      status: 'alive',
    });

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith(
      '/character?name=rick&status=alive',
    );
  });

  test('returns only the first five characters', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: sixCharacters,
    });

    // Act
    const result = await getHomeCharacters(defaultFilters);

    // Assert
    expect(result).toEqual(sixCharacters.slice(0, 5));
  });

  test('returns an empty list when the api answers 404 for filters without results', async () => {
    // Arrange
    getJsonMock.mockRejectedValue(new HttpRequestError(404));

    // Act
    const result = await getHomeCharacters({
      search: 'no-match',
      status: 'all',
    });

    // Assert
    expect(result).toEqual([]);
  });
});
