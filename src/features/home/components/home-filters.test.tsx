import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { HomeFilters } from './home-filters';

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderHomeFilters(
  overrides: Partial<React.ComponentProps<typeof HomeFilters>> = {},
) {
  const defaultProps: React.ComponentProps<typeof HomeFilters> = {
    searchValue: '',
    selectedStatus: 'all',
    onChangeSearch: jest.fn(),
    onChangeStatus: jest.fn(),
  };

  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <HomeFilters {...defaultProps} {...overrides} />,
    );
  });

  return currentRenderer!;
}

describe('HomeFilters', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the search placeholder', () => {
    // Arrange

    // Act
    const renderer = renderHomeFilters();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-search-input' }).props
        .placeholder,
    ).toBe('Busca por nombre');
  });

  test('renders the controlled search value', () => {
    // Arrange

    // Act
    const renderer = renderHomeFilters({
      searchValue: 'Rick',
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-search-input' }).props.value,
    ).toBe('Rick');
  });

  test('calls onChangeSearch when the input changes', () => {
    // Arrange
    const onChangeSearch = jest.fn();
    const renderer = renderHomeFilters({
      onChangeSearch,
    });

    // Act
    act(() => {
      renderer.root.findByProps({ testID: 'home-search-input' }).props
        .onChangeText('Morty');
    });

    // Assert
    expect(onChangeSearch).toHaveBeenCalledWith('Morty');
  });

  test('calls onChangeStatus when the dead filter is pressed', () => {
    // Arrange
    const onChangeStatus = jest.fn();
    const renderer = renderHomeFilters({
      onChangeStatus,
    });

    // Act
    act(() => {
      renderer.root.findByProps({ testID: 'home-filter-dead' }).props.onPress();
    });

    // Assert
    expect(onChangeStatus).toHaveBeenCalledWith('dead');
  });

  test('marks the selected chip through accessibility state', () => {
    // Arrange

    // Act
    const renderer = renderHomeFilters({
      selectedStatus: 'unknown',
    });

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'home-filter-unknown' }).props
        .accessibilityState,
    ).toEqual({ selected: true });
  });
});
