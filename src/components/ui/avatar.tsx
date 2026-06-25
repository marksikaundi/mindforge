import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

type AvatarProps = {
  emoji: string;
  size?: number;
  showLevel?: boolean;
  level?: number;
};

export function Avatar({ emoji, size = 48, showLevel, level }: AvatarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
        <ThemedText style={[styles.emoji, { fontSize: size * 0.5 }]}>{emoji}</ThemedText>
      </View>
      {showLevel && level !== undefined && (
        <View style={styles.levelBadge}>
          <ThemedText style={styles.levelText}>{level}</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    lineHeight: undefined,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Brand.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
