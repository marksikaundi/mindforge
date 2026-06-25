import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'success';
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ title, onPress, variant = 'primary', disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        variant === 'success' && styles.success,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <ThemedText
        style={[
          styles.label,
          variant === 'outline' && styles.outlineLabel,
          variant === 'ghost' && styles.ghostLabel,
        ]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Brand.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Brand.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  success: {
    backgroundColor: Brand.success,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  outlineLabel: {
    color: Brand.primary,
  },
  ghostLabel: {
    color: Brand.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
