import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../../../shared/theme/colors';
import { SurfaceCard } from '../../../shared/ui/surface-card';
import {
  HOME_FILTER_ALIVE_LABEL,
  HOME_FILTER_ALL_LABEL,
  HOME_FILTER_DEAD_LABEL,
  HOME_FILTERS_DESCRIPTION,
  HOME_FILTERS_TITLE,
  HOME_FILTER_UNKNOWN_LABEL,
  HOME_SEARCH_PLACEHOLDER,
} from '../constants/home.constants';
import { type HomeCharacterStatusFilter } from '../types/home-characters-filters';

type HomeFiltersProps = {
  searchValue: string;
  selectedStatus: HomeCharacterStatusFilter;
  onChangeSearch: (nextValue: string) => void;
  onChangeStatus: (nextValue: HomeCharacterStatusFilter) => void;
};

const statusFilterOptions: Array<{
  label: string;
  value: HomeCharacterStatusFilter;
}> = [
  {
    label: HOME_FILTER_ALL_LABEL,
    value: 'all',
  },
  {
    label: HOME_FILTER_ALIVE_LABEL,
    value: 'alive',
  },
  {
    label: HOME_FILTER_DEAD_LABEL,
    value: 'dead',
  },
  {
    label: HOME_FILTER_UNKNOWN_LABEL,
    value: 'unknown',
  },
];

export function HomeFilters({
  searchValue,
  selectedStatus,
  onChangeSearch,
  onChangeStatus,
}: HomeFiltersProps) {
  return (
    <SurfaceCard testID="home-filters-card">
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Search and filter</Text>
        <Text style={styles.title}>{HOME_FILTERS_TITLE}</Text>
        <Text style={styles.description}>{HOME_FILTERS_DESCRIPTION}</Text>
      </View>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeSearch}
        placeholder={HOME_SEARCH_PLACEHOLDER}
        placeholderTextColor={colors.muted}
        style={styles.searchInput}
        testID="home-search-input"
        value={searchValue}
      />

      <View style={styles.filtersRow}>
        {statusFilterOptions.map(option => {
          const isSelected = option.value === selectedStatus;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={option.value}
              onPress={() => onChangeStatus(option.value)}
              style={[
                styles.filterChip,
                isSelected ? styles.filterChipSelected : null,
              ]}
              testID={`home-filter-${option.value}`}
            >
              <Text
                style={[
                  styles.filterChipLabel,
                  isSelected ? styles.filterChipLabelSelected : null,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    marginBottom: 8,
    color: '#7ea1c5',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 6,
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  searchInput: {
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0a1829',
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#14273c',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  filterChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipLabel: {
    color: '#d8e7f7',
    fontSize: 14,
    fontWeight: '700',
  },
  filterChipLabelSelected: {
    color: colors.accentText,
  },
});
