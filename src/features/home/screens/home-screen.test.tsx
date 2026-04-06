import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { getJson } from '../../../shared/api/http-client';
import { HomeScreen } from './home-screen';

jest.mock('../../../shared/api/http-client', () => ({
  getJson: jest.fn(),
}));

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

const getJsonMock = getJson as jest.MockedFunction<typeof getJson>;

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
    getJsonMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('requests the character endpoint when the screen mounts', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [],
    });

    // Act
    renderHomeScreen();
    await flushPendingUpdates();

    // Assert
    expect(getJsonMock).toHaveBeenCalledWith('/character');
  });

  test('renders the loading message while the request is pending', () => {
    // Arrange
    getJsonMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-loading' }).props.children,
    ).toBe('Cargando personajes...');
  });

  test('renders the first character after a successful request', async () => {
    // Arrange
    getJsonMock.mockResolvedValue({
      results: [{ id: 1, name: 'Rick Sanchez' }],
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
    getJsonMock.mockRejectedValue(new Error('Network error'));

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
