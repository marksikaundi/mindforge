import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

import { GradientOverlay } from '@/components/game/gradient-surface';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CardVariant = 'default' | 'hero' | 'flat';

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

  const content = (
    <>
      {!isHero && accent && <GradientOverlay color={accentColor} />}
      {!isHero && accent && (
        <View style={[styles.accentDot, { backgroundColor: accentColor }]} />
      )}
      <View style={[padded && styles.padded, isHero && styles.heroContent]}>{children}</View>
    </>
  );

  const cardStyle = [
    styles.card,
    variant !== 'flat' && Shadow.card,
    isHero && styles.hero,
    {
      backgroundColor: isHero ? accentColor : theme.backgroundElement,
      borderColor: isHero ? 'transparent' : theme.border,
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
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  hero: {
    borderWidth: 0,
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
  accentDot: {
    position: 'absolute',
    top: Spacing.three,
    left: Spacing.three,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  padded: {
    padding: Spacing.four,
  },
  heroContent: {
    padding: Spacing.four,
  },
});
