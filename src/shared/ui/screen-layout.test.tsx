import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { ScreenLayout } from './screen-layout';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

const { useSafeAreaInsets } = jest.requireMock('react-native-safe-area-context') as {
  useSafeAreaInsets: jest.Mock;
};

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderScreenLayout(
  overrides: Partial<React.ComponentProps<typeof ScreenLayout>> = {},
) {
  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <ScreenLayout {...overrides}>content</ScreenLayout>,
    );
  });

  return currentRenderer!;
}

describe('ScreenLayout', () => {
  beforeEach(() => {
    useSafeAreaInsets.mockReturnValue({
      top: 12,
      right: 0,
      bottom: 10,
      left: 0,
    });
  });

  afterEach(() => {
    useSafeAreaInsets.mockReset();

    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('uses the top inset by default', () => {
    // Arrange

    // Act
    const renderer = renderScreenLayout();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'screen-layout-container' }).props
        .style[1].paddingTop,
    ).toBe(36);
  });

  test('can disable the top inset for screens with native headers', () => {
    // Arrange

    // Act
    const renderer = renderScreenLayout({
      withTopInset: false,
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'screen-layout-container' }).props
        .style[1].paddingTop,
    ).toBe(0);
  });
});
