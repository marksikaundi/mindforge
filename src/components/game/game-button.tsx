import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { GradientSurface } from '@/components/game/gradient-surface';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/theme';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
  light?: boolean;
  size?: 'md' | 'lg';
};

export function GameButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled,
  light,
  size = 'md',
}: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isLarge = size === 'lg';

  const labelColor = isPrimary
    ? '#FFFFFF'
    : light
      ? '#FFFFFF'
      : isGhost
        ? theme.accent
        : theme.text;

  const inner = (
    <ThemedText style={[styles.label, isLarge && styles.labelLg, { color: labelColor }]}>
      {label}
    </ThemedText>
  );

  const buttonStyle = [
    styles.button,
    isLarge && styles.buttonLg,
    Shadow.card,
    {
      backgroundColor: isOutline || isGhost
        ? isGhost
          ? 'transparent'
          : light
            ? 'rgba(255,255,255,0.12)'
            : theme.backgroundElevated
        : light
          ? 'rgba(255,255,255,0.18)'
          : theme.backgroundElevated,
      borderColor: isOutline
        ? light
          ? 'rgba(255,255,255,0.45)'
          : theme.border
        : 'transparent',
      borderWidth: isOutline ? 1.5 : 0,
    },
    style,
  ];

  if (isPrimary) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.wrap,
          { opacity: disabled ? 0.45 : pressed ? 0.92 : 1 },
          style,
        ]}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -35)]}
          style={[styles.button, isLarge && styles.buttonLg, Shadow.elevated]}>
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
        buttonStyle,
        { opacity: disabled ? 0.45 : pressed ? 0.88 : 1 },
      ]}>
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonLg: {
    minHeight: 56,
    paddingVertical: Spacing.three + 2,
  },
  label: {
    ...Typography.bodySm,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelLg: {
    fontSize: 16,
  },
});
