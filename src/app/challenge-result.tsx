import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function ChallengeResultScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { addStars } = useGame();

  const claimReward = () => {
    addStars(50);
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText style={styles.badge}>🎖️</ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          Amazing!
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.desc}>
          You completed today&apos;s challenge
        </ThemedText>

        <View style={[styles.statsCard, { borderColor: theme.border }]}>
          <View style={styles.stat}>
            <ThemedText themeColor="textSecondary" type="small">
              Score
            </ThemedText>
            <ThemedText style={styles.statValue}>150</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.stat}>
            <ThemedText themeColor="textSecondary" type="small">
              Rank
            </ThemedText>
            <ThemedText style={styles.statValue}>#12</ThemedText>
          </View>
        </View>
      </View>

      <GameButton label="CLAIM REWARD" onPress={claimReward} />
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
  badge: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
  },
  desc: {
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  statsCard: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    padding: Spacing.four,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    marginVertical: Spacing.one,
  },
});
