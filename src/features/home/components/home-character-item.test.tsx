import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeCharacterItem } from './home-character-item';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeCharacterItem(
  overrides: Partial<React.ComponentProps<typeof HomeCharacterItem>> = {},
) {
  const defaultProps: React.ComponentProps<typeof HomeCharacterItem> = {
    character: {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    onPress: jest.fn(),
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <HomeCharacterItem {...defaultProps} {...overrides} />,
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

  test('calls onPress with the selected character', () => {
    // Arrange
    const onPress = jest.fn();
    const renderer = renderHomeCharacterItem({ onPress });

    // Act
    act(() => {
      renderer.root.findByProps({ testID: 'home-character-pressable-1' }).props
        .onPress();
    });

    // Assert
    expect(onPress).toHaveBeenCalledWith({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
  });
});
