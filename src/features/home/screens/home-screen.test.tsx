import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { CHARACTER_DETAIL_ROUTE_NAME } from '../../../app/navigation/route-names';
import { useHomeCharacters } from '../hooks/use-home-characters';
import { HomeScreen } from './home-screen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

jest.mock('../hooks/use-home-characters', () => ({
  useHomeCharacters: jest.fn(),
}));

jest.mock('../components/home-header', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeHeader: () => <MockText testID="home-header-present">header</MockText>,
  };
});

jest.mock('../components/home-filters', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeFilters: ({
      searchValue,
      selectedStatus,
      onChangeSearch,
      onChangeStatus,
    }: {
      searchValue: string;
      selectedStatus: 'all' | 'alive' | 'dead' | 'unknown';
      onChangeSearch: (nextValue: string) => void;
      onChangeStatus: (nextValue: 'all' | 'alive' | 'dead' | 'unknown') => void;
    }) => (
      <>
        <MockText testID="home-filters-search-value">{searchValue}</MockText>
        <MockText testID="home-filters-status-value">{selectedStatus}</MockText>
        <MockText
          testID="home-filters-change-search"
          onPress={() => onChangeSearch('Morty')}
        >
          change-search
        </MockText>
        <MockText
          testID="home-filters-change-status"
          onPress={() => onChangeStatus('dead')}
        >
          change-status
        </MockText>
      </>
    ),
  };
});

jest.mock('../components/home-characters-card', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeCharactersCard: ({
      characters,
      isLoading,
      errorMessage,
      onPressCharacter,
    }: {
      characters: {
        id: number;
        name: string;
        status: 'Alive' | 'Dead' | 'unknown';
        gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
        species: string;
        origin: { name: string; url: string };
        image: string;
      }[];
      isLoading: boolean;
      errorMessage: string | null;
      onPressCharacter: (character: {
        id: number;
        name: string;
        status: 'Alive' | 'Dead' | 'unknown';
        gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
        species: string;
        origin: { name: string; url: string };
        image: string;
      }) => void;
    }) => (
      <>
        <MockText testID="home-card-characters-count">{characters.length}</MockText>
        <MockText testID="home-card-loading-value">{String(isLoading)}</MockText>
        <MockText testID="home-card-error-value">{errorMessage ?? 'null'}</MockText>
        <MockText
          testID="home-card-press-first-character"
          onPress={() => onPressCharacter(characters[0])}
        >
          press-first-character
        </MockText>
      </>
    ),
  };
});

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

const useHomeCharactersMock =
  useHomeCharacters as jest.MockedFunction<typeof useHomeCharacters>;
const useNavigationMock =
  useNavigation as jest.MockedFunction<typeof useNavigation>;
const useQueryClientMock =
  useQueryClient as jest.MockedFunction<typeof useQueryClient>;

const firstCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive' as const,
  gender: 'Male' as const,
  species: 'Human',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<HomeScreen />);
  });

  return currentRenderer!;
}

function mockHomeScreenBase() {
  useNavigationMock.mockReturnValue({
    navigate: jest.fn(),
  } as never);
  useQueryClientMock.mockReturnValue({
    prefetchQuery: jest.fn(),
  } as never);
  useHomeCharactersMock.mockReturnValue({
    characters: [],
    isLoading: false,
    errorMessage: null,
  });
}

describe('HomeScreen', () => {
  afterEach(() => {
    useNavigationMock.mockReset();
    useQueryClientMock.mockReset();
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
    mockHomeScreenBase();
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
    mockHomeScreenBase();

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-present' }).props
        .children,
    ).toBe('header');
  });

  test('passes the default search value to the filters component', () => {
    // Arrange
    mockHomeScreenBase();

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-filters-search-value' }).props
        .children,
    ).toBe('');
  });

  test('passes the default status value to the filters component', () => {
    // Arrange
    mockHomeScreenBase();

    // Act
    const renderer = renderHomeScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-filters-status-value' }).props
        .children,
    ).toBe('all');
  });

  test('calls the hook with the default filters', () => {
    // Arrange
    mockHomeScreenBase();

    // Act
    renderHomeScreen();

    // Assert
    expect(useHomeCharactersMock).toHaveBeenCalledWith({
      search: '',
      status: 'all',
    });
  });

  test('updates the hook filters after changing the search value', () => {
    // Arrange
    mockHomeScreenBase();
    const renderer = renderHomeScreen();

    // Act
    act(() => {
      renderer.root.findByProps({ testID: 'home-filters-change-search' }).props
        .onPress();
    });

    // Assert
    expect(useHomeCharactersMock).toHaveBeenLastCalledWith({
      search: 'Morty',
      status: 'all',
    });
  });

  test('updates the hook filters after changing the status value', () => {
    // Arrange
    mockHomeScreenBase();
    const renderer = renderHomeScreen();

    // Act
    act(() => {
      renderer.root.findByProps({ testID: 'home-filters-change-status' }).props
        .onPress();
    });

    // Assert
    expect(useHomeCharactersMock).toHaveBeenLastCalledWith({
      search: '',
      status: 'dead',
    });
  });

  test('passes the character count to the card component', () => {
    // Arrange
    mockHomeScreenBase();
    useHomeCharactersMock.mockReturnValue({
      characters: [firstCharacter, { ...firstCharacter, id: 2, name: 'Morty Smith' }],
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
    mockHomeScreenBase();
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

  test('navigates to character detail with the selected id', () => {
    // Arrange
    const navigate = jest.fn();
    const prefetchQuery = jest.fn();

    useNavigationMock.mockReturnValue({
      navigate,
    } as never);
    useQueryClientMock.mockReturnValue({
      prefetchQuery,
    } as never);
    useHomeCharactersMock.mockReturnValue({
      characters: [firstCharacter],
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderHomeScreen();
    act(() => {
      renderer.root.findByProps({ testID: 'home-card-press-first-character' })
        .props.onPress();
    });

    // Assert
    expect(navigate).toHaveBeenCalledWith(CHARACTER_DETAIL_ROUTE_NAME, {
      characterId: 1,
    });
  });

  test('prefetches character detail when a character is selected', () => {
    // Arrange
    const prefetchQuery = jest.fn();

    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);
    useQueryClientMock.mockReturnValue({
      prefetchQuery,
    } as never);
    useHomeCharactersMock.mockReturnValue({
      characters: [firstCharacter],
      isLoading: false,
      errorMessage: null,
    });

    // Act
    const renderer = renderHomeScreen();
    act(() => {
      renderer.root.findByProps({ testID: 'home-card-press-first-character' })
        .props.onPress();
    });

    // Assert
    expect(prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['character-detail', 1],
      }),
    );
  });
});
