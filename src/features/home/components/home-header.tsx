import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../shared/theme/colors';
import {
  HOME_ACTIVE_FILTER_ALL_VALUE,
  HOME_ACTIVE_FILTER_LABEL,
  HOME_FILTER_ALIVE_LABEL,
  HOME_FILTER_DEAD_LABEL,
  HOME_FILTER_UNKNOWN_LABEL,
  HOME_HEADER_BADGE_TEXT,
  HOME_RESULTS_LABEL,
  HOME_SCREEN_DESCRIPTION,
  HOME_SCREEN_SUBTITLE,
  HOME_SCREEN_TITLE,
} from '../constants/home.constants';
import { type HomeCharacterStatusFilter } from '../types/home-characters-filters';

type HomeHeaderProps = {
  characterCount: number;
  searchValue: string;
  selectedStatus: HomeCharacterStatusFilter;
};

const statusLabels: Record<Exclude<HomeCharacterStatusFilter, 'all'>, string> = {
  alive: HOME_FILTER_ALIVE_LABEL,
  dead: HOME_FILTER_DEAD_LABEL,
  unknown: HOME_FILTER_UNKNOWN_LABEL,
};

function getActiveFilterValue({
  searchValue,
  selectedStatus,
}: Pick<HomeHeaderProps, 'searchValue' | 'selectedStatus'>) {
  const normalizedSearch = searchValue.trim();

  if (normalizedSearch) {
    return `Search: ${normalizedSearch}`;
  }

  if (selectedStatus !== 'all') {
    return `Status: ${statusLabels[selectedStatus]}`;
  }

  return HOME_ACTIVE_FILTER_ALL_VALUE;
}

export function HomeHeader({
  characterCount,
  searchValue,
  selectedStatus,
}: HomeHeaderProps) {
  const activeFilterValue = getActiveFilterValue({
    searchValue,
    selectedStatus,
  });

  return (
    <View style={styles.hero} testID="home-hero">
      <View style={styles.backgroundAccent} />

      <View style={styles.badge}>
        <Text style={styles.badgeText} testID="home-header-badge">
          {HOME_HEADER_BADGE_TEXT}
        </Text>
      </View>

      <Text style={styles.subtitle} testID="home-header-subtitle">
        {HOME_SCREEN_SUBTITLE}
      </Text>
      <Text style={styles.title} testID="home-header-title">
        {HOME_SCREEN_TITLE}
      </Text>
      <Text style={styles.description} testID="home-header-description">
        {HOME_SCREEN_DESCRIPTION}
      </Text>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{HOME_RESULTS_LABEL}</Text>
          <Text style={styles.metricValue} testID="home-header-count">
            {characterCount}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{HOME_ACTIVE_FILTER_LABEL}</Text>
          <Text style={styles.metricDetail} testID="home-header-active-filter">
            {activeFilterValue}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 22,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(216, 255, 114, 0.16)',
    backgroundColor: '#0d1b2d',
    padding: 24,
  },
  backgroundAccent: {
    position: 'absolute',
    top: -80,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(216, 255, 114, 0.10)',
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(216, 255, 114, 0.24)',
    backgroundColor: 'rgba(216, 255, 114, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    marginBottom: 8,
    color: '#8fb0d1',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    maxWidth: 280,
    marginBottom: 12,
    color: colors.text,
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 42,
  },
  description: {
    maxWidth: 320,
    marginBottom: 22,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  metricsRow: {
    gap: 12,
  },
  metricCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
  },
  metricLabel: {
    marginBottom: 6,
    color: '#7ea1c5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  metricDetail: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});
