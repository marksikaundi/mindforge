import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { shadeHex } from '@/lib/color';
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
    <ScreenContainer ambient>
      <View style={styles.content}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -35)]}
          style={styles.iconCircle}>
          <SymbolView
            name={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }}
            size={36}
            tintColor="#FFFFFF"
          />
        </GradientSurface>

        <ThemedText style={styles.title}>Daily challenge</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.desc}>
          One new puzzle every day. Compete with players worldwide.
        </ThemedText>

        <Card style={styles.timerCard}>
          <ThemedText themeColor="textSecondary" style={styles.timerLabel}>
            Next challenge in
          </ThemedText>
          <ThemedText style={styles.timer}>
            {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
          </ThemedText>
        </Card>
      </View>

      <GameButton label="Play challenge" onPress={startChallenge} size="lg" />
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
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
  },
  desc: {
    ...Typography.bodySm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.four,
    maxWidth: 280,
  },
  timerCard: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.two,
  },
  timerLabel: {
    ...Typography.label,
  },
  timer: {
    ...Typography.display,
    fontVariant: ['tabular-nums'],
  },
});
