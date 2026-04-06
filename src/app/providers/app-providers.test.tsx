import React from 'react';
import { Text } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { AppProviders } from './app-providers';
import { setupReactQueryReactNative } from './setup-react-query-react-native';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('./setup-react-query-react-native', () => ({
  setupReactQueryReactNative: jest.fn(),
}));

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;
const setupReactQueryReactNativeMock =
  setupReactQueryReactNative as jest.MockedFunction<
    typeof setupReactQueryReactNative
  >;

function QueryClientProbe() {
  const queryClient = useQueryClient();

  return (
    <>
      <Text testID="providers-child">providers-child</Text>
      <Text testID="providers-query-client">{String(Boolean(queryClient))}</Text>
    </>
  );
}

function renderAppProviders() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <AppProviders>
        <QueryClientProbe />
      </AppProviders>,
    );
  });

  return currentRenderer!;
}

describe('AppProviders', () => {
  afterEach(() => {
    setupReactQueryReactNativeMock.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the provider children', () => {
    // Arrange
    setupReactQueryReactNativeMock.mockReturnValue(jest.fn());

    // Act
    const renderer = renderAppProviders();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'providers-child' }).props.children,
    ).toBe('providers-child');
  });

  test('provides a query client instance', () => {
    // Arrange
    setupReactQueryReactNativeMock.mockReturnValue(jest.fn());

    // Act
    const renderer = renderAppProviders();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'providers-query-client' }).props
        .children,
    ).toBe('true');
  });

  test('sets up React Query React Native integration on mount', () => {
    // Arrange
    setupReactQueryReactNativeMock.mockReturnValue(jest.fn());

    // Act
    renderAppProviders();

    // Assert
    expect(setupReactQueryReactNativeMock).toHaveBeenCalledTimes(1);
  });

  test('cleans up the React Query React Native integration on unmount', () => {
    // Arrange
    const cleanup = jest.fn();

    setupReactQueryReactNativeMock.mockReturnValue(cleanup);

    // Act
    renderAppProviders();
    act(() => {
      currentRenderer?.unmount();
    });

    // Assert
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
