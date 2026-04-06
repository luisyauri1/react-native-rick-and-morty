import React, { type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

type SurfaceCardProps = PropsWithChildren<{
  testID?: string;
}>;

export function SurfaceCard({ children, testID }: SurfaceCardProps) {
  return (
    <View style={styles.card} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
  },
});
