import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeCharacterItem } from './home-character-item';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeCharacterItem() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <HomeCharacterItem
        character={{
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        }}
      />,
    );
  });

  return currentRenderer!;
}

describe('HomeCharacterItem', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the character name', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharacterItem();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-1' }).props.children,
    ).toBe('Rick Sanchez');
  });

  test('renders the character status and species', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharacterItem();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-meta-1' }).props
        .children,
    ).toEqual(['Alive', ' - ', 'Human']);
  });

  test('renders the character image', () => {
    // Arrange

    // Act
    const renderer = renderHomeCharacterItem();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-character-image-1' }).props
        .source,
    ).toEqual({
      uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
  });
});
