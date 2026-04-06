import { buildCharacterDetailRouteParams } from './build-character-detail-route-params';

describe('buildCharacterDetailRouteParams', () => {
  test('builds the route params from the selected character id', () => {
    // Arrange
    const character = {
      id: 1,
    };

    // Act
    const result = buildCharacterDetailRouteParams(character);

    // Assert
    expect(result).toEqual({
      characterId: 1,
    });
  });
});
