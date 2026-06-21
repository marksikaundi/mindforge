import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

type GameHeaderProps = {
  showSettings?: boolean;
};

export function GameHeader({ showSettings = true }: GameHeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { stars, flames } = useGame();

  return (
    <View style={styles.row}>
      <Pressable style={[styles.avatar, Shadow.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <ThemedText style={styles.avatarText}>👤</ThemedText>
      </Pressable>

      <View style={styles.stats}>
        <View style={[styles.stat, Shadow.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <ThemedText style={styles.statEmoji}>⭐</ThemedText>
          <ThemedText type="smallBold">{stars.toLocaleString()}</ThemedText>
        </View>
        <View style={[styles.stat, Shadow.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <ThemedText style={styles.statEmoji}>🔥</ThemedText>
          <ThemedText type="smallBold">{flames}</ThemedText>
        </View>
      </View>

      {showSettings && (
        <Pressable
          onPress={() => router.push('/settings')}
          hitSlop={12}
          style={[styles.settingsBtn, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <ThemedText style={styles.gear}>⚙️</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  statEmoji: {
    fontSize: 14,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gear: {
    fontSize: 20,
  },
});
