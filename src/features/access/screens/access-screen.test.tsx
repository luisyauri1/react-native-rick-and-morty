import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { APP_TITLE } from '../../../shared/constants/app.constants';
import {
  ACCESS_SCREEN_BADGE_TEXT,
  ACCESS_SCREEN_BUTTON_LABEL,
  ACCESS_SCREEN_DESCRIPTION,
} from '../constants/access.constants';
import { AccessScreen } from './access-screen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../../shared/ui/primary-button', () => {
  const { Text: MockText } = require('react-native');

  return {
    PrimaryButton: ({
      label,
      onPress,
    }: {
      label: string;
      onPress: () => void;
    }) => (
      <MockText testID="access-primary-button" onPress={onPress}>
        {label}
      </MockText>
    ),
  };
});

const useNavigationMock =
  useNavigation as jest.MockedFunction<typeof useNavigation>;

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderAccessScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<AccessScreen />);
  });

  return currentRenderer!;
}

describe('AccessScreen', () => {
  afterEach(() => {
    useNavigationMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the badge text', () => {
    // Arrange
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);

    // Act
    const renderer = renderAccessScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'access-badge-text' }).props.children,
    ).toBe(ACCESS_SCREEN_BADGE_TEXT);
  });

  test('renders the app title', () => {
    // Arrange
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);

    // Act
    const renderer = renderAccessScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'access-title' }).props.children,
    ).toBe(APP_TITLE);
  });

  test('renders the screen description', () => {
    // Arrange
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);

    // Act
    const renderer = renderAccessScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'access-description' }).props
        .children,
    ).toBe(ACCESS_SCREEN_DESCRIPTION);
  });

  test('renders the button label', () => {
    // Arrange
    useNavigationMock.mockReturnValue({
      navigate: jest.fn(),
    } as never);

    // Act
    const renderer = renderAccessScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'access-primary-button' }).props
        .children,
    ).toBe(ACCESS_SCREEN_BUTTON_LABEL);
  });

  test('navigates to home when the button is pressed', () => {
    // Arrange
    const navigate = jest.fn();

    useNavigationMock.mockReturnValue({
      navigate,
    } as never);

    // Act
    const renderer = renderAccessScreen();
    act(() => {
      renderer.root.findByProps({ testID: 'access-primary-button' }).props
        .onPress();
    });

    // Assert
    expect(navigate).toHaveBeenCalledWith('Home');
  });
});
