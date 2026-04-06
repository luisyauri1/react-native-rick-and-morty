import { getJson } from '../../../shared/api/http-client';

import { getCharacterDetail } from './get-character-detail';

jest.mock('../../../shared/api/http-client', () => ({
  getJson: jest.fn(),
}));

const getJsonMock = getJson as jest.MockedFunction<typeof getJson>;

describe('getCharacterDetail', () => {
  afterEach(() => {
    getJsonMock.mockReset();
  });

  test('calls the selected character endpoint', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
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
    });

    // Act
    await getCharacterDetail(1);

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character/1');
  });

  test('returns the selected character detail', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
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
    });

    // Act
    const result = await getCharacterDetail(1);

    // Assert
    expect(result).toEqual({
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
    });
  });
});
