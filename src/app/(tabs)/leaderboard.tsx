import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { LEADERBOARD } from '@/data/game-data';
import { useTheme } from '@/hooks/use-theme';

type Tab = 'global' | 'friends';

export default function LeaderboardScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('global');

  return (
    <ScreenContainer scroll>
      <ThemedText type="subtitle" style={styles.title}>
        Leaderboard
      </ThemedText>

      <View style={[styles.tabs, { borderColor: theme.border }]}>
        {(['global', 'friends'] as Tab[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[
              styles.tab,
              tab === t && { backgroundColor: theme.accent },
            ]}>
            <ThemedText
              type="smallBold"
              style={tab === t ? { color: theme.background } : undefined}>
              {t.toUpperCase()}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {LEADERBOARD.map((entry) => (
          <View
            key={entry.rank}
            style={[
              styles.row,
              {
                borderColor: theme.border,
                backgroundColor: entry.isUser ? theme.backgroundSelected : theme.background,
              },
            ]}>
            <ThemedText type="smallBold" style={styles.rank}>
              #{entry.rank}
            </ThemedText>
            <ThemedText style={styles.avatar}>{entry.avatar}</ThemedText>
            <ThemedText style={styles.name}>{entry.name}</ThemedText>
            <ThemedText type="smallBold" style={styles.score}>
              {entry.score}
            </ThemedText>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: Spacing.four,
    marginTop: Spacing.two,
  },
  tabs: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.four,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.five,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    gap: Spacing.two,
  },
  rank: {
    width: 32,
  },
  avatar: {
    fontSize: 24,
  },
  name: {
    flex: 1,
    fontWeight: '600',
  },
  score: {
    letterSpacing: 0.5,
  },
});
