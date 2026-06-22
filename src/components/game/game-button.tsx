import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { GradientSurface } from '@/components/game/gradient-surface';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
  light?: boolean;
};

export function GameButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled,
  light,
}: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const labelColor = isPrimary
    ? '#FFFFFF'
    : light
      ? '#FFFFFF'
      : isGhost
        ? theme.accent
        : theme.text;

  const inner = (
    <ThemedText style={[styles.label, { color: labelColor }]}>{label}</ThemedText>
  );

  if (isPrimary) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [styles.wrap, { opacity: disabled ? 0.45 : pressed ? 0.9 : 1 }, style]}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -40)]}
          style={[styles.button, Shadow.card]}>
          {inner}
        </GradientSurface>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        Shadow.card,
        {
          backgroundColor: isOutline || isGhost
            ? isGhost
              ? 'transparent'
              : light
                ? 'rgba(255,255,255,0.15)'
                : theme.backgroundElement
            : light
              ? 'rgba(255,255,255,0.2)'
              : theme.backgroundElement,
          borderColor: isOutline
            ? light
              ? 'rgba(255,255,255,0.5)'
              : theme.border
            : 'transparent',
          borderWidth: isOutline ? 1.5 : 0,
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
        },
        style,
      ]}>
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
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
    letterSpacing: 0.2,
  },
});
