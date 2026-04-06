import React, { type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';

type ScreenLayoutProps = PropsWithChildren<{
  contentAlignment?: 'center' | 'top';
  withTopInset?: boolean;
}>;

export function ScreenLayout({
  children,
  contentAlignment = 'center',
  withTopInset = true,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const containerInsetStyle = {
    paddingTop: withTopInset ? insets.top + 24 : 0,
    paddingBottom: Math.max(insets.bottom, 20) + 20,
  };

  return (
    <View
      testID="screen-layout-container"
      style={[styles.container, containerInsetStyle]}
    >
      <View
        testID="screen-layout-content"
        style={[
          styles.content,
          contentAlignment === 'top' ? styles.contentTop : styles.contentCenter,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  contentCenter: {
    justifyContent: 'center',
  },
  contentTop: {
    justifyContent: 'flex-start',
  },
});
