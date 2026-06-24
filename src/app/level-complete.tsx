import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Card } from '@/components/game/card';
import { GradientSurface } from '@/components/game/gradient-surface';
import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { StatChip } from '@/components/game/stat-chip';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function LevelCompleteScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { levelId, mode, difficulty, score, time } = useLocalSearchParams<{
    levelId: string;
    mode: string;
    difficulty: string;
    score: string;
    time: string;
  }>();
  const { completeLevel, addStars, addXp, unlockAchievement } = useGame();

  const handleContinue = () => {
    const key = `${mode}-${difficulty}-${levelId}`;
    if (levelId !== 'daily') {
      completeLevel(key, 3);
    }
    addStars(30);
    addXp(50);
    unlockAchievement('first-steps');

    if (levelId === 'daily') {
      router.replace('/challenge-result');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <ScreenContainer ambient>
      <View style={styles.content}>
        <GradientSurface
          colors={[theme.star, shadeHex(theme.star, -30)]}
          style={styles.trophyCircle}>
          <SymbolView
            name={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
            size={40}
            tintColor="#FFFFFF"
          />
        </GradientSurface>

        <ThemedText style={styles.title}>Level complete!</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Outstanding work on this level
        </ThemedText>

        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <ThemedText themeColor="textSecondary" style={styles.statLabel}>
              Score
            </ThemedText>
            <ThemedText style={styles.statValue}>{score ?? '120'}</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />
          <View style={styles.statRow}>
            <ThemedText themeColor="textSecondary" style={styles.statLabel}>
              Time
            </ThemedText>
            <ThemedText style={styles.statValue}>{time ?? '01:32'}</ThemedText>
          </View>
        </Card>

        <View style={styles.rewards}>
          <ThemedText style={styles.rewardsLabel}>Rewards earned</ThemedText>
          <View style={styles.rewardRow}>
            <StatChip icon="⭐" value="+30" tint={theme.star} />
            <StatChip
              symbol={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
              value="+1"
              tint={theme.flame}
            />
          </View>
        </View>
      </View>

      <GameButton label="Continue" onPress={handleContinue} size="lg" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  trophyCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  statsCard: {
    width: '100%',
    gap: Spacing.three,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.bodySm,
  },
  statValue: {
    ...Typography.h2,
    fontVariant: ['tabular-nums'],
  },
  divider: {
    height: 1,
  },
  rewards: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  rewardsLabel: {
    ...Typography.label,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
