import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/game/back-header';
import { Card } from '@/components/game/card';
import { ProgressBar } from '@/components/game/progress-bar';
import { ScreenContainer } from '@/components/game/screen-container';
import { SegmentedControl } from '@/components/game/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';
import { ACHIEVEMENTS } from '@/data/game-data';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

type Filter = 'all' | 'unlocked' | 'locked';

export default function AchievementsScreen() {
  const theme = useTheme();
  const { unlockedAchievements } = useGame();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = ACHIEVEMENTS.filter((a) => {
    const unlocked = unlockedAchievements.includes(a.id);
    if (filter === 'unlocked') return unlocked;
    if (filter === 'locked') return !unlocked;
    return true;
  });

  return (
    <ScreenContainer scroll ambient>
      <BackHeader title="Achievements" />

      <SegmentedControl
        options={['all', 'unlocked', 'locked'] as Filter[]}
        value={filter}
        onChange={setFilter}
        labels={{ all: 'All', unlocked: 'Unlocked', locked: 'Locked' }}
      />

      <View style={styles.list}>
        {filtered.map((achievement) => {
          const unlocked = unlockedAchievements.includes(achievement.id);
          const hasProgress = achievement.progress !== undefined && achievement.total !== undefined;

          return (
            <Card
              key={achievement.id}
              accent={unlocked ? theme.success : undefined}
              style={
                !unlocked && filter === 'locked'
                  ? { ...styles.card, opacity: 0.65 }
                  : styles.card
              }>
              <ThemedText style={styles.emoji}>{achievement.emoji}</ThemedText>
              <View style={styles.info}>
                <ThemedText style={styles.cardTitle}>{achievement.title}</ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.cardDesc}>
                  {achievement.description}
                </ThemedText>
                {hasProgress && !unlocked && (
                  <View style={styles.progressWrap}>
                    <ProgressBar
                      progress={((achievement.progress ?? 0) / (achievement.total ?? 1)) * 100}
                      color={theme.accent}
                    />
                    <ThemedText themeColor="textSecondary" style={styles.progressText}>
                      {achievement.progress}/{achievement.total}
                    </ThemedText>
                  </View>
                )}
                {unlocked && (
                  <ThemedText style={[styles.unlocked, { color: theme.success }]}>
                    ✓ Completed
                  </ThemedText>
                )}
              </View>
            </Card>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.two,
    marginTop: Spacing.four,
    paddingBottom: Spacing.five,
  },
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    gap: Spacing.one,
  },
  cardTitle: {
    ...Typography.bodySm,
    fontWeight: '700',
  },
  cardDesc: {
    ...Typography.caption,
    lineHeight: 18,
  },
  progressWrap: {
    marginTop: Spacing.one,
    gap: Spacing.one,
  },
  progressText: {
    ...Typography.caption,
  },
  unlocked: {
    ...Typography.caption,
    fontWeight: '700',
    marginTop: Spacing.one,
  },
});
