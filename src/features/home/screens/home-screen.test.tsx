import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { getHomeCharacters } from '../api/get-home-characters';
import { HomeScreen } from './home-screen';

jest.mock('../api/get-home-characters', () => ({
  getHomeCharacters: jest.fn(),
}));

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

const getHomeCharactersMock =
  getHomeCharacters as jest.MockedFunction<typeof getHomeCharacters>;

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
    getHomeCharactersMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('requests home characters when the screen mounts', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([]);

    // Act
    renderHomeScreen();
    await flushPendingUpdates();

    // Assert
    expect(getHomeCharactersMock).toHaveBeenCalledWith();
  });

  test('renders the loading message while the request is pending', () => {
    // Arrange
    getHomeCharactersMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-loading' }).props.children,
    ).toBe('Cargando personajes...');
  });

  test('renders the first character after a successful request', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([{ id: 1, name: 'Rick Sanchez' }]);

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
    getHomeCharactersMock.mockRejectedValue(new Error('Network error'));

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
