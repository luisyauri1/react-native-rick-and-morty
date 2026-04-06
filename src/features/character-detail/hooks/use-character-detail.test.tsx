import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { getCharacterDetail } from '../api/get-character-detail';
import { useCharacterDetail } from './use-character-detail';

jest.mock('../api/get-character-detail', () => ({
  getCharacterDetail: jest.fn(),
}));

const getCharacterDetailMock =
  getCharacterDetail as jest.MockedFunction<typeof getCharacterDetail>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function HookHarness() {
  const { character, isLoading, errorMessage } = useCharacterDetail(1);

  return (
    <>
      <Text testID="hook-loading">{String(isLoading)}</Text>
      <Text testID="hook-error">{errorMessage ?? 'null'}</Text>
      <Text testID="hook-character-name">{character?.name ?? 'none'}</Text>
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

describe('useCharacterDetail', () => {
  afterEach(() => {
    getCharacterDetailMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('requests the selected character when the hook mounts', async () => {
    // Arrange
    getCharacterDetailMock.mockResolvedValue({
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
    });

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(getCharacterDetailMock).toHaveBeenCalledWith(1);
  });

  test('starts in loading state while the request is pending', () => {
    // Arrange
    getCharacterDetailMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHookHarness();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'hook-loading' }).props.children,
    ).toBe('true');
  });

  test('stores the loaded character after a successful request', async () => {
    // Arrange
    getCharacterDetailMock.mockResolvedValue({
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
    });

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'hook-character-name' }).props
        .children,
    ).toBe('Rick Sanchez');
  });

  test('stores an error message when the request fails', async () => {
    // Arrange
    getCharacterDetailMock.mockRejectedValue(new Error('Network error'));

    // Act
    renderHookHarness();
    await flushPendingUpdates();

    // Assert
    expect(
      currentRenderer!.root.findByProps({ testID: 'hook-error' }).props
        .children,
    ).toBe('No pudimos cargar el detalle del personaje.');
  });
});
