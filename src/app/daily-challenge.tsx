import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function DailyChallengeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 32, seconds: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const startChallenge = () => {
    router.push({
      pathname: '/gameplay/[levelId]',
      params: { levelId: 'daily', mode: 'puzzles', difficulty: 'medium' },
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText style={styles.emoji}>📅</ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          Daily Challenge
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.desc}>
          A new puzzle every day. Compete with players worldwide!
        </ThemedText>

        <View style={[styles.timerBox, { borderColor: theme.border }]}>
          <ThemedText type="small" themeColor="textSecondary">
            Next challenge in
          </ThemedText>
          <ThemedText style={styles.timer}>
            {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </ThemedText>
        </View>
      </View>

      <GameButton label="PLAY CHALLENGE" onPress={startChallenge} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.four,
  },
  timerBox: {
    alignItems: 'center',
    padding: Spacing.four,
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    gap: Spacing.two,
    width: '100%',
  },
  timer: {
    fontSize: 36,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
