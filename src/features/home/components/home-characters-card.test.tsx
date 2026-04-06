import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeCharactersCard } from './home-characters-card';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeCharactersCard(
  overrides: Partial<React.ComponentProps<typeof HomeCharactersCard>> = {},
) {
  const defaultProps: React.ComponentProps<typeof HomeCharactersCard> = {
    characters: [],
    isLoading: false,
    errorMessage: null,
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <HomeCharactersCard {...defaultProps} {...overrides} />,
    );
  });

  return currentRenderer!;
}

describe('HomeCharactersCard', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the card title', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard();

    // Assert
    expect(renderer.root.findAllByType(Text)[0].props.children).toBe(
      'Primeros personajes',
    );
  });

  test('renders the loading message when it is loading', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard({ isLoading: true });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-loading' }).props.children,
    ).toBe('Cargando personajes...');
  });

  test('renders the first character when data is available', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard({
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      ],
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-1' }).props.children,
    ).toBe('Rick Sanchez');
  });

  test('renders the character status and species', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard({
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      ],
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-meta-1' }).props
        .children,
    ).toEqual(['Alive', ' - ', 'Human']);
  });

  test('renders the character image', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard({
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      ],
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-image-1' }).props
        .source,
    ).toEqual({
      uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
  });

  test('renders the error message when the request fails', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharactersCard({
      errorMessage: 'No pudimos cargar personajes.',
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-error' }).props.children,
    ).toBe('No pudimos cargar personajes.');
  });
});
