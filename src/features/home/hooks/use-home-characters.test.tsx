import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';

import { getHomeCharacters } from '../api/get-home-characters';
import { useHomeCharacters } from './use-home-characters';

jest.mock('../api/get-home-characters', () => ({
  getHomeCharacters: jest.fn(),
}));

const getHomeCharactersMock =
  getHomeCharacters as jest.MockedFunction<typeof getHomeCharacters>;

const defaultFilters = {
  search: '',
  status: 'all',
} as const;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;
let currentQueryClient: QueryClient | null = null;

function HookHarness({
  search = defaultFilters.search,
  status = defaultFilters.status,
}: {
  search?: string;
  status?: 'all' | 'alive' | 'dead' | 'unknown';
}) {
  const { characters, isLoading, errorMessage } = useHomeCharacters({
    search,
    status,
  });
  const queryClient = useQueryClient();

  return (
    <>
      <Text testID="hook-loading">{String(isLoading)}</Text>
      <Text testID="hook-error">{errorMessage ?? 'null'}</Text>
      <Text testID="hook-first-character">{characters[0]?.name ?? 'none'}</Text>
      <Text testID="hook-query-client">{String(Boolean(queryClient))}</Text>
    </>
  );
}

function renderHookHarness(
  overrides: React.ComponentProps<typeof HookHarness> = {},
) {
  currentQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <QueryClientProvider client={currentQueryClient!}>
        <HookHarness {...overrides} />
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

describe('useHomeCharacters', () => {
  afterEach(() => {
    getHomeCharactersMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
    currentQueryClient?.clear();
    currentQueryClient = null;
  });

  test('requests home characters with the provided filters when the hook mounts', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([]);

    // Act
    renderHookHarness({
      search: 'Morty',
      status: 'dead',
    });
    await flushPendingUpdates();

    // Assert
    expect(getHomeCharactersMock).toHaveBeenCalledWith({
      search: 'Morty',
      status: 'dead',
    });
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

  test('receives the query client from the provider', () => {
    // Arrange
    getHomeCharactersMock.mockReturnValue(new Promise(() => undefined));

    // Act
    const renderer = renderHookHarness();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'hook-query-client' }).props.children,
    ).toBe('true');
  });

  test('stores the first loaded character after a successful request', async () => {
    // Arrange
    getHomeCharactersMock.mockResolvedValue([
      {
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
