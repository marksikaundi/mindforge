import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
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
        {
          backgroundColor: selected ? theme.backgroundSelected : theme.backgroundElement,
          borderColor: selected ? theme.accent : theme.border,
          opacity: disabled ? 0.6 : pressed ? 0.9 : 1,
        },
      ]}>
      <View style={[styles.letter, { backgroundColor: selected ? theme.accent : theme.background }]}>
        <ThemedText
          style={[styles.letterText, { color: selected ? '#FFFFFF' : theme.textSecondary }]}>
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
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  letter: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
