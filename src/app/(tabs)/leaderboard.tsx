import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ScreenHeader } from '@/components/game/screen-header';
import { SegmentedControl } from '@/components/game/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { LEADERBOARD } from '@/data/game-data';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type Tab = 'global' | 'friends';

const PODIUM_COLORS = ['#F59E0B', '#94A3B8', '#CD7F32'];
const PODIUM_HEIGHTS = [72, 52, 40];

export default function LeaderboardScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('global');

  const topThree = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  return (
    <ScreenContainer scroll ambient>
      <ScreenHeader title="Leaderboard" subtitle="See how you rank this week" />

      <SegmentedControl
        options={['global', 'friends'] as Tab[]}
        value={tab}
        onChange={setTab}
        labels={{ global: 'Global', friends: 'Friends' }}
      />

      <Card variant="flat" style={styles.podiumCard}>
        <View style={styles.podium}>
          {podiumOrder.map((entry) => {
            if (!entry) return null;
            const place = entry.rank;
            const height = PODIUM_HEIGHTS[place - 1] ?? 40;
            const color = PODIUM_COLORS[place - 1] ?? theme.border;

            return (
              <View key={entry.rank} style={styles.podiumCol}>
                <View style={[styles.avatarRing, { borderColor: color }]}>
                  <ThemedText style={styles.podiumAvatar}>{entry.avatar}</ThemedText>
                </View>
                <ThemedText style={styles.podiumName} numberOfLines={1}>
                  {entry.name.split(' ')[0]}
                </ThemedText>
                <ThemedText type="smallBold" style={[styles.podiumScore, { color }]}>
                  {entry.score.toLocaleString()}
                </ThemedText>
                <GradientSurface
                  colors={[color, hexAlpha(color, 0.6)]}
                  style={{ ...styles.podiumBar, height }}>
                  <ThemedText style={styles.podiumRank}>#{place}</ThemedText>
                </GradientSurface>
              </View>
            );
          })}
        </View>
      </Card>

      <View style={styles.list}>
        {rest.map((entry) => (
          <Pressable
            key={entry.rank}
            style={({ pressed }) => [
              styles.row,
              Shadow.card as object,
              {
                borderColor: entry.isUser ? theme.accent : theme.border,
                backgroundColor: entry.isUser ? theme.backgroundSelected : theme.backgroundElement,
                opacity: pressed ? 0.92 : 1,
              },
              entry.isUser && { borderWidth: 2 },
            ]}>
            <ThemedText type="smallBold" style={styles.rank}>
              #{entry.rank}
            </ThemedText>
            <View style={[styles.rowAvatar, { backgroundColor: hexAlpha(theme.accent, 0.12) }]}>
              <ThemedText style={styles.avatar}>{entry.avatar}</ThemedText>
            </View>
            <View style={styles.nameCol}>
              <ThemedText style={styles.name}>{entry.name}</ThemedText>
              {entry.isUser && (
                <ThemedText type="small" style={{ color: theme.accent, fontWeight: '600' }}>
                  Your rank
                </ThemedText>
              )}
            </View>
            <ThemedText type="smallBold" style={styles.score}>
              {entry.score.toLocaleString()}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  podiumCard: {
    marginTop: Spacing.four,
    marginBottom: Spacing.four,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.two,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: Spacing.two,
    minHeight: 160,
  },
  podiumCol: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  avatarRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  podiumAvatar: {
    fontSize: 26,
  },
  podiumName: {
    fontSize: 13,
    fontWeight: '700',
    maxWidth: 80,
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 12,
    marginBottom: Spacing.one,
  },
  podiumBar: {
    width: '100%',
    borderTopLeftRadius: BorderRadius.sm,
    borderTopRightRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Spacing.one,
  },
  podiumRank: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
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
    borderRadius: BorderRadius.lg,
    gap: Spacing.two,
  },
  rank: {
    width: 36,
    fontSize: 14,
  },
  rowAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    fontSize: 20,
  },
  nameCol: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
  },
  score: {
    letterSpacing: 0.3,
    fontSize: 14,
  },
});
