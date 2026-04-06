import React from 'react';
import { Text } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { AppProviders } from './app-providers';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

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
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the provider children', () => {
    // Arrange

    // Act
    const renderer = renderAppProviders();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'providers-child' }).props.children,
    ).toBe('providers-child');
  });

  test('provides a query client instance', () => {
    // Arrange

    // Act
    const renderer = renderAppProviders();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'providers-query-client' }).props
        .children,
    ).toBe('true');
  });
});
