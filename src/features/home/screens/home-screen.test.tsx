import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

import { CHARACTER_DETAIL_ROUTE_NAME } from '../../../app/navigation/route-names';
import { useHomeCharacters } from '../hooks/use-home-characters';
import { HomeScreen } from './home-screen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
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

jest.mock('../components/home-characters-card', () => {
  const { Text: MockText } = require('react-native');

  return {
    HomeCharactersCard: ({
      characters,
      isLoading,
      errorMessage,
      onPressCharacter,
    }: {
      characters: { id: number; name: string }[];
      isLoading: boolean;
      errorMessage: string | null;
      onPressCharacter: (character: { id: number; name: string }) => void;
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

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<HomeScreen />);
  });

  return currentRenderer!;
}

describe('HomeScreen', () => {
  afterEach(() => {
    useNavigationMock.mockReset();
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
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);
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
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);
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
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);
    useHomeCharactersMock.mockReturnValue({
      characters: [
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
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          gender: 'Male',
          species: 'Human',
          origin: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        },
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
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);
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

    useNavigationMock.mockReturnValue({
      navigate,
    } as never);
    useHomeCharactersMock.mockReturnValue({
      characters: [
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
      ],
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
});
