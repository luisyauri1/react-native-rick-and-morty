import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';

import { getHomeCharacters } from '../api/get-home-characters';
import { useHomeCharacters } from './use-home-characters';

jest.mock('../api/get-home-characters', () => ({
  getHomeCharacters: jest.fn(),
}));

const getHomeCharactersMock =
  getHomeCharacters as jest.MockedFunction<typeof getHomeCharacters>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function HookHarness() {
  const { characters, isLoading, errorMessage } = useHomeCharacters();

  return (
    <>
      <Text testID="hook-loading">{String(isLoading)}</Text>
      <Text testID="hook-error">{errorMessage ?? 'null'}</Text>
      <Text testID="hook-first-character">{characters[0]?.name ?? 'none'}</Text>
    </>
  );
}

function renderHookHarness() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<HookHarness />);
  });

  return currentRenderer!;
}

async function flushPendingUpdates() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('useHomeCharacters', () => {
  afterEach(() => {
    getHomeCharactersMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('requests home characters when the hook mounts', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([]);

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(getHomeCharactersMock).toHaveBeenCalledWith();
  });

  test('starts in loading state while the request is pending', () => {
    // Arrange
    getHomeCharactersMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHookHarness();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'hook-loading' }).props.children,
    ).toBe('true');
  });

  test('stores the first loaded character after a successful request', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    ]);

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'hook-first-character' }).props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('stores an error message when the request fails', async () => {
    // Arrange
    getHomeCharactersMock.mockRejectedValue(new Error('Network error'));

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'hook-error' }).props.children,
    ).toBe('No pudimos cargar personajes.');
  });
});
