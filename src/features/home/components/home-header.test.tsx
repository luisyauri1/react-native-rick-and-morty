import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeHeader } from './home-header';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeHeader(
  overrides: Partial<React.ComponentProps<typeof HomeHeader>> = {},
) {
  const defaultProps: React.ComponentProps<typeof HomeHeader> = {
    characterCount: 5,
    searchValue: '',
    selectedStatus: 'all',
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <HomeHeader {...defaultProps} {...overrides} />,
    );
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

  test('renders the badge text', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-badge' }).props.children,
    ).toBe('Character directory');
  });

  test('renders the title', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-title' }).props.children,
    ).toBe('The Rick and Morty API');
  });

  test('renders the subtitle', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-subtitle' }).props
        .children,
    ).toBe('Home');
  });

  test('renders the current character count', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader({
      characterCount: 3,
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-count' }).props.children,
    ).toBe(3);
  });

  test('renders the active search summary when there is a search term', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader({
      searchValue: 'Morty',
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-active-filter' }).props
        .children,
    ).toBe('Search: Morty');
  });

  test('renders the active status summary when there is no search term', () => {
    // Arrange

    // Act
    const renderer = renderHomeHeader({
      selectedStatus: 'dead',
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-header-active-filter' }).props
        .children,
    ).toBe('Status: Dead');
  });
});
