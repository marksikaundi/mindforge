import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
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
    <View style={[styles.track, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              selected && { backgroundColor: theme.accent },
            ]}>
            <ThemedText
              type="smallBold"
              style={[
                styles.label,
                selected && { color: '#FFFFFF' },
              ]}>
              {labels?.[option] ?? option.toUpperCase()}
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
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: 3,
    gap: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
