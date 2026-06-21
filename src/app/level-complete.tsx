import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
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
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText style={styles.trophy}>🏆</ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          Level Complete!
        </ThemedText>

        <View style={[styles.statsCard, { borderColor: theme.border }]}>
          <View style={styles.statRow}>
            <ThemedText themeColor="textSecondary">Score</ThemedText>
            <ThemedText type="smallBold">{score ?? '120'}</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.statRow}>
            <ThemedText themeColor="textSecondary">Time</ThemedText>
            <ThemedText type="smallBold">{time ?? '01:32'}</ThemedText>
          </View>
        </View>

        <View style={styles.rewards}>
          <ThemedText type="smallBold">Rewards</ThemedText>
          <View style={styles.rewardRow}>
            <ThemedText>⭐ +30</ThemedText>
            <ThemedText>🔥 +1</ThemedText>
          </View>
        </View>
      </View>

      <GameButton label="CONTINUE" onPress={handleContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  trophy: {
    fontSize: 64,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  statsCard: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
  },
  rewards: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
});
