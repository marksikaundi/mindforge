import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/game/back-header';
import { ProgressBar } from '@/components/game/progress-bar';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
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
    <ScreenContainer scroll>
      <BackHeader title="ACHIEVEMENTS" />

      <View style={[styles.tabs, { borderColor: theme.border }]}>
        {(['all', 'unlocked', 'locked'] as Filter[]).map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.tab, filter === f && { backgroundColor: theme.accent }]}>
            <ThemedText
              type="smallBold"
              style={[styles.tabText, filter === f && { color: theme.background }]}>
              {f.toUpperCase()}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {filtered.map((achievement) => {
          const unlocked = unlockedAchievements.includes(achievement.id);
          const hasProgress = achievement.progress !== undefined && achievement.total !== undefined;

          return (
            <View
              key={achievement.id}
              style={[
                styles.card,
                {
                  borderColor: theme.border,
                  backgroundColor: unlocked ? theme.backgroundElement : theme.background,
                  opacity: unlocked || filter !== 'locked' ? 1 : 0.6,
                },
              ]}>
              <ThemedText style={styles.emoji}>{achievement.emoji}</ThemedText>
              <View style={styles.info}>
                <ThemedText type="smallBold">{achievement.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {achievement.description}
                </ThemedText>
                {hasProgress && !unlocked && (
                  <View style={styles.progressWrap}>
                    <ProgressBar
                      progress={((achievement.progress ?? 0) / (achievement.total ?? 1)) * 100}
                    />
                    <ThemedText type="small" themeColor="textSecondary">
                      {achievement.progress}/{achievement.total}
                    </ThemedText>
                  </View>
                )}
                {unlocked && (
                  <ThemedText type="small" style={styles.unlocked}>
                    ✓ Completed
                  </ThemedText>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  tabText: {
    fontSize: 11,
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.five,
  },
  card: {
    flexDirection: 'row',
    padding: Spacing.three,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
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
  progressWrap: {
    marginTop: Spacing.one,
    gap: Spacing.one,
  },
  unlocked: {
    color: '#2E7D32',
    fontWeight: '600',
    marginTop: Spacing.one,
  },
});
