import React from 'react';
import { Text } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { getCharacterDetail } from '../api/get-character-detail';
import { useCharacterDetail } from './use-character-detail';

jest.mock('../api/get-character-detail', () => ({
  getCharacterDetail: jest.fn(),
}));

const getCharacterDetailMock =
  getCharacterDetail as jest.MockedFunction<typeof getCharacterDetail>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;
let currentQueryClient: QueryClient | null = null;

function HookHarness() {
  const { character, isLoading, errorMessage } = useCharacterDetail(1);
  const queryClient = useQueryClient();

  return (
    <>
      <Text testID="hook-loading">{String(isLoading)}</Text>
      <Text testID="hook-error">{errorMessage ?? 'null'}</Text>
      <Text testID="hook-character-name">{character?.name ?? 'none'}</Text>
      <Text testID="hook-query-client">{String(Boolean(queryClient))}</Text>
    </>
  );
}

function renderHookHarness() {
  currentQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <QueryClientProvider client={currentQueryClient!}>
        <HookHarness />
      </QueryClientProvider>,
    );
  });

  return currentRenderer!;
}

async function flushPendingUpdates() {
  await act(async () => {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 0);
    });
  });

  await act(async () => {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 0);
    });
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
    currentQueryClient?.clear();
    currentQueryClient = null;
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

  test('receives the query client from the provider', () => {
    // Arrange
    getCharacterDetailMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHookHarness();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'hook-query-client' }).props.children,
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
