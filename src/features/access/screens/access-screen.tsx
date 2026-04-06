import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { APP_TITLE } from '../../../shared/constants/app.constants';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { ScreenLayout } from '../../../shared/ui/screen-layout';
import { colors } from '../../../shared/theme/colors';
import {
  ACCESS_SCREEN_BADGE_TEXT,
  ACCESS_SCREEN_BUTTON_LABEL,
  ACCESS_SCREEN_DESCRIPTION,
} from '../constants/access.constants';

export function AccessScreen() {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <View style={styles.badge}>
        <Text style={styles.badgeText} testID="access-badge-text">
          {ACCESS_SCREEN_BADGE_TEXT}
        </Text>
      </View>

      <Text style={styles.title} testID="access-title">
        {APP_TITLE}
      </Text>
      <Text style={styles.description} testID="access-description">
        {ACCESS_SCREEN_DESCRIPTION}
      </Text>

      <PrimaryButton
        label={ACCESS_SCREEN_BUTTON_LABEL}
        onPress={() => navigation.navigate('Home')}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 16,
    color: colors.text,
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 46,
  },
  description: {
    marginBottom: 32,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
