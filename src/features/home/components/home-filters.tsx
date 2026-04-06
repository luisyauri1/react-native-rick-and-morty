import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../../../shared/theme/colors';
import {
  HOME_FILTER_ALIVE_LABEL,
  HOME_FILTER_ALL_LABEL,
  HOME_FILTER_DEAD_LABEL,
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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  searchInput: {
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  filterChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  filterChipLabelSelected: {
    color: colors.accentText,
  },
});
