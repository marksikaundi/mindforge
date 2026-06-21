import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SolutionScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { explanation, levelId, mode, difficulty, question } = useLocalSearchParams<{
    explanation: string;
    levelId?: string;
    mode?: string;
    difficulty?: string;
    question?: string;
  }>();

  const goBack = () => {
    if (levelId && mode && difficulty) {
      router.replace({
        pathname: '/gameplay/[levelId]',
        params: { levelId, mode, difficulty, q: question ?? '1' },
      });
    } else {
      router.back();
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText style={styles.emoji}>💡</ThemedText>
        <ThemedText style={styles.title}>Solution</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Here&apos;s how to think through this one
        </ThemedText>

        <Card accent={theme.accentMuted} style={styles.explanationCard}>
          <ThemedText style={styles.explanation}>
            {explanation ?? 'Review the pattern or clues carefully and try again.'}
          </ThemedText>
        </Card>
      </View>

      <GameButton label="Got it — try again" onPress={goBack} />
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
    fontSize: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  explanationCard: {
    width: '100%',
  },
  explanation: {
    fontSize: 16,
    lineHeight: 26,
  },
});
