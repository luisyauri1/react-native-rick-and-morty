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
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
        { id: 3, name: 'Summer Smith' },
        { id: 4, name: 'Beth Smith' },
        { id: 5, name: 'Jerry Smith' },
        { id: 6, name: 'Abadango Cluster Princess' },
      ],
    });

    // Act
    const result = await getHomeCharacters();

    // Assert
    expect(result).toEqual([
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
      { id: 3, name: 'Summer Smith' },
      { id: 4, name: 'Beth Smith' },
      { id: 5, name: 'Jerry Smith' },
    ]);
  });
});
