import { StyleSheet, View } from 'react-native';

import { GradientSurface } from '@/components/game/gradient-surface';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type UserAvatarProps = {
  name?: string;
  level?: number;
  size?: number;
};

export function UserAvatar({ name = 'Alex', level, size = 44 }: UserAvatarProps) {
  const theme = useTheme();
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <GradientSurface
        colors={[theme.accent, shadeHex(theme.accent, -35)]}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
        <ThemedText style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</ThemedText>
      </GradientSurface>
      {level !== undefined && (
        <View style={[styles.badge, { backgroundColor: theme.star, borderColor: theme.backgroundElement }]}>
          <ThemedText style={styles.badgeText}>{level}</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
