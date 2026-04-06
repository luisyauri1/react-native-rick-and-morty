import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

import { setupReactQueryReactNative } from './setup-react-query-react-native';

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(),
  },
}));

jest.mock('@tanstack/react-query', () => ({
  focusManager: {
    setFocused: jest.fn(),
  },
  onlineManager: {
    setEventListener: jest.fn(),
  },
}));

jest.mock('react-native', () => ({
  AppState: {
    addEventListener: jest.fn(),
  },
}));

const addNetInfoListenerMock = NetInfo.addEventListener as jest.MockedFunction<
  typeof NetInfo.addEventListener
>;
const setFocusedMock = focusManager.setFocused as jest.MockedFunction<
  typeof focusManager.setFocused
>;
const setEventListenerMock = onlineManager.setEventListener as jest.MockedFunction<
  typeof onlineManager.setEventListener
>;
const addAppStateListenerMock =
  AppState.addEventListener as jest.MockedFunction<typeof AppState.addEventListener>;

describe('setupReactQueryReactNative', () => {
  afterEach(() => {
    addNetInfoListenerMock.mockReset();
    setFocusedMock.mockReset();
    setEventListenerMock.mockReset();
    addAppStateListenerMock.mockReset();
  });

  test('registers the AppState listener', () => {
    // Arrange
    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(() => undefined);

    // Act
    setupReactQueryReactNative();

    // Assert
    expect(addAppStateListenerMock).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  test('marks queries as focused when AppState becomes active', () => {
    // Arrange
    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(() => undefined);

    // Act
    setupReactQueryReactNative();
    const handleAppStateChange = addAppStateListenerMock.mock.calls[0][1];
    handleAppStateChange('active');

    // Assert
    expect(setFocusedMock).toHaveBeenCalledWith(true);
  });

  test('marks queries as unfocused when AppState becomes inactive', () => {
    // Arrange
    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(() => undefined);

    // Act
    setupReactQueryReactNative();
    const handleAppStateChange = addAppStateListenerMock.mock.calls[0][1];
    handleAppStateChange('background');

    // Assert
    expect(setFocusedMock).toHaveBeenCalledWith(false);
  });

  test('registers the online manager listener', () => {
    // Arrange
    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(() => undefined);

    // Act
    setupReactQueryReactNative();

    // Assert
    expect(setEventListenerMock).toHaveBeenCalledTimes(1);
  });

  test('marks queries as online when NetInfo reports connectivity', () => {
    // Arrange
    const setOnline = jest.fn();

    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(listener => {
      listener(setOnline);
    });
    addNetInfoListenerMock.mockImplementation(listener => {
      listener({
        isConnected: true,
      } as never);

      return jest.fn();
    });

    // Act
    setupReactQueryReactNative();

    // Assert
    expect(setOnline).toHaveBeenCalledWith(true);
  });

  test('marks queries as offline when NetInfo reports disconnection', () => {
    // Arrange
    const setOnline = jest.fn();

    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    setEventListenerMock.mockImplementation(listener => {
      listener(setOnline);
    });
    addNetInfoListenerMock.mockImplementation(listener => {
      listener({
        isConnected: false,
      } as never);

      return jest.fn();
    });

    // Act
    setupReactQueryReactNative();

    // Assert
    expect(setOnline).toHaveBeenCalledWith(false);
  });

  test('removes the AppState listener during cleanup', () => {
    // Arrange
    const remove = jest.fn();

    addAppStateListenerMock.mockReturnValue({
      remove,
    });
    setEventListenerMock.mockImplementation(() => undefined);

    // Act
    const cleanup = setupReactQueryReactNative();
    cleanup();

    // Assert
    expect(remove).toHaveBeenCalledTimes(1);
  });

  test('subscribes to NetInfo inside the online manager listener', () => {
    // Arrange
    addAppStateListenerMock.mockReturnValue({
      remove: jest.fn(),
    });
    addNetInfoListenerMock.mockReturnValue(jest.fn());

    setEventListenerMock.mockImplementation(listener => {
      listener(jest.fn());
    });

    // Act
    setupReactQueryReactNative();

    // Assert
    expect(addNetInfoListenerMock).toHaveBeenCalledTimes(1);
  });
});
