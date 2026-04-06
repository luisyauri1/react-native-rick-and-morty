import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { useHomeCharacters } from '../hooks/use-home-characters';
import { HomeScreen } from './home-screen';

jest.mock('../hooks/use-home-characters', () => ({
  useHomeCharacters: jest.fn(),
}));

jest.mock('../components/home-header', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeHeader: () => <MockText testID="home-header-present">header</MockText>,
  };
});

jest.mock('../components/home-characters-card', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeCharactersCard: ({
      characters,
      isLoading,
      errorMessage,
    }: {
      characters: { id: number; name: string }[];
      isLoading: boolean;
      errorMessage: string | null;
    }) => (
      <>
        <MockText testID="home-card-characters-count">{characters.length}</MockText>
        <MockText testID="home-card-loading-value">{String(isLoading)}</MockText>
        <MockText testID="home-card-error-value">{errorMessage ?? 'null'}</MockText>
      </>
    ),
  };
});

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

const useHomeCharactersMock =
  useHomeCharacters as jest.MockedFunction<typeof useHomeCharacters>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<HomeScreen />);
  });

  return currentRenderer!;
}

describe('HomeScreen', () => {
  afterEach(() => {
    useHomeCharactersMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the loading message when the hook is loading', () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [],
      isLoading: true,
      errorMessage: null,
    });

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-card-loading-value' }).props
        .children,
    ).toBe('true');
  });

  test('renders the header component', () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [],
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-present' }).props
        .children,
    ).toBe('header');
  });

  test('passes the character count to the card component', () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-card-characters-count' }).props
        .children,
    ).toBe(2);
  });

  test('passes the error message to the card component', () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [],
      isLoading: false,
      errorMessage: 'No pudimos cargar personajes.',
    });

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-card-error-value' }).props
        .children,
    ).toBe('No pudimos cargar personajes.');
  });
});
