import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import {
  CHARACTER_DETAIL_PROFILE_BADGE_TEXT,
  CHARACTER_DETAIL_SPECIES_LABEL,
  CHARACTER_DETAIL_STATUS_LABEL,
} from '../constants/character-detail.constants';
import { CharacterDetailProfile } from './character-detail-profile';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderCharacterDetailProfile(
  overrides: Partial<React.ComponentProps<typeof CharacterDetailProfile>> = {},
) {
  const defaultProps: React.ComponentProps<typeof CharacterDetailProfile> = {
    character: {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <CharacterDetailProfile {...defaultProps} {...overrides} />,
    );
  });

  return currentRenderer!;
}

describe('CharacterDetailProfile', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the profile badge text', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-badge-text' }).props
        .children,
    ).toBe(CHARACTER_DETAIL_PROFILE_BADGE_TEXT);
  });

  test('renders the status label', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-status-label' })
        .props.children,
    ).toBe(CHARACTER_DETAIL_STATUS_LABEL);
  });

  test('renders the species label', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-species-label' })
        .props.children,
    ).toBe(CHARACTER_DETAIL_SPECIES_LABEL);
  });

  test('renders the selected character image', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-image' }).props
        .source,
    ).toEqual({
      uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
  });

  test('renders the selected character name', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-name' }).props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('renders the selected character status', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-status' }).props
        .children,
    ).toBe('Alive');
  });

  test('renders the selected character species', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailProfile();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-species' }).props
        .children,
    ).toBe('Human');
  });
});
