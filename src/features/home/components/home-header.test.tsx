import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeHeader } from './home-header';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeHeader() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(<HomeHeader />);
  });

  return currentRenderer!;
}

describe('HomeHeader', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the title', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader();

    // Assert
    expect(renderer.root.findAllByType(Text)[0].props.children).toBe(
      'The Rick and Morty API',
    );
  });

  test('renders the subtitle', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader();

    // Assert
    expect(renderer.root.findAllByType(Text)[1].props.children).toBe('Home');
  });
});
