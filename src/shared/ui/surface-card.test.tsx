import React from 'react';
import { View } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { SurfaceCard } from './surface-card';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderSurfaceCard(
  overrides: Partial<React.ComponentProps<typeof SurfaceCard>> = {},
) {
  const defaultProps: React.ComponentProps<typeof SurfaceCard> = {
    children: 'card-content',
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <SurfaceCard {...defaultProps} {...overrides} />,
    );
  });

  return currentRenderer!;
}

describe('SurfaceCard', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the card children', () => {
    // Arrange

    // Act
    const renderer = renderSurfaceCard();

    // Assert
    expect(renderer.root.findAllByType(View)[0].props.children).toBe(
      'card-content',
    );
  });

  test('forwards the test id to the card container', () => {
    // Arrange

    // Act
    const renderer = renderSurfaceCard({
      testID: 'surface-card',
    });

    // Assert
    expect(renderer.root.findAllByType(View)[0].props.testID).toBe(
      'surface-card',
    );
  });
});
