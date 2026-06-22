import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

const LETTERS = ['A', 'B', 'C', 'D'];

type OptionButtonProps = {
  index: number;
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export function OptionButton({ index, label, selected, onPress, disabled }: OptionButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        Shadow.card as object,
        {
          backgroundColor: selected ? theme.backgroundSelected : theme.backgroundElement,
          borderColor: selected ? theme.accent : theme.border,
          borderWidth: selected ? 2 : 1.5,
          opacity: disabled ? 0.55 : pressed ? 0.92 : 1,
          transform: [{ scale: pressed && !disabled ? 0.985 : 1 }],
        },
      ]}>
      <View
        style={[
          styles.letter,
          {
            backgroundColor: selected ? theme.accent : hexAlpha(theme.accent, 0.1),
          },
        ]}>
        <ThemedText
          style={[styles.letterText, { color: selected ? '#FFFFFF' : theme.accent }]}>
          {LETTERS[index] ?? '?'}
        </ThemedText>
      </View>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: BorderRadius.lg,
  },
  letter: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: 14,
    fontWeight: '800',
  },
  label: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
