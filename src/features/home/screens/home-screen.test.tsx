import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { useHomeCharacters } from '../hooks/use-home-characters';
import { HomeScreen } from './home-screen';

jest.mock('../hooks/use-home-characters', () => ({
  useHomeCharacters: jest.fn(),
}));

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

async function flushPendingUpdates() {
  await act(async () => {
    await Promise.resolve();
  });
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
      renderer.root.findByProps({ testID: 'home-loading' }).props.children,
    ).toBe('Cargando personajes...');
  });

  test('renders the first character after a successful request', async () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [{ id: 1, name: 'Rick Sanchez' }],
      isLoading: false,
      errorMessage: null,
    });

    // Act
    renderHomeScreen();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'home-character-1' }).props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('renders an error message when the request fails', async () => {
    // Arrange
    useHomeCharactersMock.mockReturnValue({
      characters: [],
      isLoading: false,
      errorMessage: 'No pudimos cargar personajes.',
    });

    // Act
    renderHomeScreen();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'home-error' }).props
        .children,
    ).toBe('No pudimos cargar personajes.');
  });
});
