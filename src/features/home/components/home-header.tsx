import React from 'react';
import { StyleSheet, Text } from 'react-native';

import {
  HOME_SCREEN_SUBTITLE,
  HOME_SCREEN_TITLE,
} from '../constants/home.constants';
import { colors } from '../../../shared/theme/colors';

export function HomeHeader() {
  return (
    <>
      <Text style={styles.title}>{HOME_SCREEN_TITLE}</Text>
      <Text style={styles.subtitle}>{HOME_SCREEN_SUBTITLE}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 28,
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
