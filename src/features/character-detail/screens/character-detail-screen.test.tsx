import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { useCharacterDetail } from '../hooks/use-character-detail';
import { CharacterDetailScreen } from './character-detail-screen';

jest.mock('../hooks/use-character-detail', () => ({
  useCharacterDetail: jest.fn(),
}));

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
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-name' }).props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('renders the selected character image', () => {
    // Arrange
    useCharacterDetailMock.mockReturnValue({
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-image' }).props
        .source,
    ).toEqual({
      uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    });
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
