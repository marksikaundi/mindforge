import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
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
    <ScreenContainer ambient>
      <View style={styles.content}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -35)]}
          style={styles.badgeCircle}>
          <SymbolView
            name={{ ios: 'medal.fill', android: 'military_tech', web: 'military_tech' }}
            size={40}
            tintColor="#FFFFFF"
          />
        </GradientSurface>

        <ThemedText style={styles.title}>Amazing!</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.desc}>
          You completed today&apos;s challenge
        </ThemedText>

        <Card style={styles.statsCard}>
          <View style={styles.stat}>
            <ThemedText themeColor="textSecondary" style={styles.statLabel}>
              Score
            </ThemedText>
            <ThemedText style={styles.statValue}>150</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />
          <View style={styles.stat}>
            <ThemedText themeColor="textSecondary" style={styles.statLabel}>
              Rank
            </ThemedText>
            <ThemedText style={styles.statValue}>#12</ThemedText>
          </View>
        </Card>
      </View>

      <GameButton label="Claim reward" onPress={claimReward} size="lg" />
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
  badgeCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  title: {
    ...Typography.h1,
  },
  desc: {
    ...Typography.bodySm,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  statsCard: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: Spacing.four,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  statLabel: {
    ...Typography.label,
  },
  statValue: {
    ...Typography.h1,
    fontVariant: ['tabular-nums'],
  },
  divider: {
    width: 1,
    marginVertical: Spacing.one,
  },
});
