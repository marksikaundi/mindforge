import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

import { GradientOverlay } from '@/components/game/gradient-surface';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type CardVariant = 'default' | 'hero' | 'flat' | 'glass';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  accent?: string;
  padded?: boolean;
  variant?: CardVariant;
  onPress?: () => void;
};

export function Card({
  children,
  style,
  accent,
  padded = true,
  variant = 'default',
  onPress,
}: CardProps) {
  const theme = useTheme();
  const accentColor = accent ?? theme.accent;
  const isHero = variant === 'hero';
  const isGlass = variant === 'glass';
  const isFlat = variant === 'flat';

  const content = (
    <>
      {!isHero && accent && !isFlat && <GradientOverlay color={accentColor} />}
      {!isHero && accent && !isFlat && (
        <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      )}
      <View style={[padded && styles.padded, isHero && styles.heroContent]}>{children}</View>
    </>
  );

  const cardStyle = [
    styles.card,
    !isFlat && Shadow.card,
    isHero && (Shadow.elevated as object),
    isHero && styles.hero,
    isGlass && { backgroundColor: hexAlpha(theme.backgroundElement, 0.85) },
    {
      backgroundColor: isHero
        ? accentColor
        : isGlass
          ? hexAlpha(theme.backgroundElement, 0.85)
          : theme.backgroundElement,
      borderColor: isHero ? 'transparent' : theme.borderSubtle,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  hero: {
    borderWidth: 0,
  },
  accentBar: {
    position: 'absolute',
    top: Spacing.three,
    bottom: Spacing.three,
    left: 0,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  padded: {
    padding: Spacing.four,
  },
  heroContent: {
    padding: Spacing.four,
  },
});
