import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { StatChip } from '@/components/game/stat-chip';
import { UserAvatar } from '@/components/game/user-avatar';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

type GameHeaderProps = {
  showSettings?: boolean;
};

export function GameHeader({ showSettings = true }: GameHeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { stars, flames, level, displayName } = useGame();

  return (
    <View style={styles.row}>
      <UserAvatar name={displayName} level={level} size={48} />

      <View style={styles.stats}>
        <StatChip
          symbol={{ ios: 'star.fill', android: 'star', web: 'star' }}
          value={stars.toLocaleString()}
          tint={theme.star}
        />
        <StatChip
          symbol={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
          value={flames}
          tint={theme.flame}
        />
      </View>

      {showSettings && (
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={12}
          style={[styles.settingsBtn, { backgroundColor: theme.backgroundElement, borderColor: theme.borderSubtle }]}>
          <SymbolView
            name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
            size={20}
            tintColor={theme.textSecondary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
