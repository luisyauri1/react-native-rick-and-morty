import { QueryClient } from '@tanstack/react-query';

import { getCharacterDetail } from '../api/get-character-detail';
import { characterDetailQueryOptions } from './character-detail-query';

jest.mock('../api/get-character-detail', () => ({
  getCharacterDetail: jest.fn(),
}));

const getCharacterDetailMock =
  getCharacterDetail as jest.MockedFunction<typeof getCharacterDetail>;

describe('characterDetailQueryOptions', () => {
  afterEach(() => {
    getCharacterDetailMock.mockReset();
  });

  test('returns the character detail query key', () => {
    // Arrange

    // Act
    const options = characterDetailQueryOptions(1);

    // Assert
    expect(options.queryKey).toEqual(['character-detail', 1]);
  });

  test('uses the selected character request as query function', async () => {
    // Arrange
    const queryClient = new QueryClient();
    getCharacterDetailMock.mockResolvedValue({
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
    await queryClient.fetchQuery(characterDetailQueryOptions(1));

    // Assert
    expect(getCharacterDetailMock).toHaveBeenCalledWith(1);
  });
});
