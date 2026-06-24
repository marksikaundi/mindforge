import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SegmentedControlProps<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Record<T, string>;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  labels,
}: SegmentedControlProps<T>) {
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: theme.borderSubtle }]}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              selected && {
                backgroundColor: theme.backgroundElement,
                ...(Shadow.card as object),
              },
            ]}>
            <ThemedText
              style={[
                styles.label,
                { color: selected ? theme.text : theme.textSecondary },
              ]}>
              {labels?.[option] ?? option.charAt(0).toUpperCase() + option.slice(1)}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: BorderRadius.full,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  label: {
    ...Typography.caption,
    fontWeight: '700',
  },
});
