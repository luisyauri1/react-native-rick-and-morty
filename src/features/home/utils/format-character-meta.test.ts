import { formatCharacterMeta } from './format-character-meta';

describe('formatCharacterMeta', () => {
  test('formats the character status and species', () => {
    // Arrange
    const character = {
      status: 'Alive' as const,
      species: 'Human',
    };

    // Act
    const result = formatCharacterMeta(character);

    // Assert
    expect(result).toBe('Alive - Human');
  });

  test('formats unknown status with the species', () => {
    // Arrange
    const character = {
      status: 'unknown' as const,
      species: 'Alien',
    };

    // Act
    const result = formatCharacterMeta(character);

    // Assert
    expect(result).toBe('unknown - Alien');
  });
});
