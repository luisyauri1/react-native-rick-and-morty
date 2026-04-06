import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { useCharacterDetail } from '../hooks/use-character-detail';
import { CharacterDetailScreen } from './character-detail-screen';

jest.mock('../hooks/use-character-detail', () => ({
  useCharacterDetail: jest.fn(),
}));

jest.mock('../components/character-detail-profile', () => {
  const { Text: MockText } = require('react-native');

  return {
    CharacterDetailProfile: ({
      character,
    }: {
      character: {
        id: number;
        name: string;
      };
    }) => (
      <MockText testID="character-detail-profile-name">
        {character.name}
      </MockText>
    ),
  };
});

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

const useCharacterDetailMock =
  useCharacterDetail as jest.MockedFunction<typeof useCharacterDetail>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderCharacterDetailScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <CharacterDetailScreen
        route={{
          params: {
            characterId: 1,
          },
        }}
      />,
    );
  });

  return currentRenderer!;
}

describe('CharacterDetailScreen', () => {
  afterEach(() => {
    useCharacterDetailMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the loading message', () => {
    // Arrange
    useCharacterDetailMock.mockReturnValue({
      character: null,
      isLoading: true,
      errorMessage: null,
    });

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-loading' }).props
        .children,
    ).toBe('Cargando detalle...');
  });

  test('renders the selected character name', () => {
    // Arrange
    useCharacterDetailMock.mockReturnValue({
      character: {
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
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-profile-name' })
        .props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('renders the error message when the request fails', () => {
    // Arrange
    useCharacterDetailMock.mockReturnValue({
      character: null,
      isLoading: false,
      errorMessage: 'No pudimos cargar el detalle del personaje.',
    });

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-error' }).props
        .children,
    ).toBe('No pudimos cargar el detalle del personaje.');
  });
});
