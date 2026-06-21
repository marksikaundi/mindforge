import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  disabled?: boolean;
};

export function GameButton({ label, onPress, variant = 'primary', style, disabled }: ButtonProps) {
  const theme = useTheme();

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary && Shadow.card,
        {
          backgroundColor: isPrimary
            ? theme.accent
            : isOutline
              ? 'transparent'
              : theme.backgroundElement,
          borderColor: isOutline ? theme.border : isPrimary ? theme.accent : theme.border,
          borderWidth: isOutline || variant === 'secondary' ? 1.5 : 0,
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
        },
        style,
      ]}>
      <ThemedText
        style={[
          styles.label,
          { color: isPrimary ? '#FFFFFF' : theme.text },
        ]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
