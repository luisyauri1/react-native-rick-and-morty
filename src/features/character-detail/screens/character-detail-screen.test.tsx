import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { CharacterDetailScreen } from './character-detail-screen';

jest.mock('../../../shared/ui/screen-layout', () => ({
  ScreenLayout: ({ children }: { children: React.ReactNode }) => children,
}));

let currentRenderer: ReactTestRenderer.ReactTestRenderer | null = null;

function renderCharacterDetailScreen() {
  act(() => {
    currentRenderer = ReactTestRenderer.create(
      <CharacterDetailScreen
        route={{
          params: {
            characterId: 1,
          },
        }}
      />,
    );
  });

  return currentRenderer!;
}

describe('CharacterDetailScreen', () => {
  afterEach(() => {
    if (currentRenderer) {
      act(() => {
        currentRenderer?.unmount();
      });
    }

    currentRenderer = null;
  });

  test('renders the selected character id', () => {
    // Arrange

    // Act
    const renderer = renderCharacterDetailScreen();

    // Assert
    expect(
      renderer.root.findByProps({ testID: 'character-detail-id' }).props
        .children,
    ).toEqual(['Character id: ', 1]);
  });
});
