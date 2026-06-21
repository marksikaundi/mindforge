import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function CorrectModal() {
  const router = useRouter();
  const theme = useTheme();
  const { levelId, mode, difficulty, question, total } = useLocalSearchParams<{
    levelId: string;
    mode: string;
    difficulty: string;
    question: string;
    total: string;
  }>();
  const { addStars } = useGame();

  const handleNext = () => {
    addStars(20);
    const q = parseInt(question ?? '1', 10);
    const t = parseInt(total ?? '5', 10);

    if (q >= t) {
      router.replace({
        pathname: '/level-complete',
        params: { levelId, mode, difficulty, score: String(q * 24), time: '01:32' },
      });
    } else {
      router.replace({
        pathname: '/gameplay/[levelId]',
        params: { levelId, mode, difficulty, q: String(q + 1) },
      });
    }
  };

  return (
    <ModalOverlay>
      <View style={[styles.iconCircle, { backgroundColor: theme.successBg }]}>
        <ThemedText style={[styles.check, { color: theme.success }]}>✓</ThemedText>
      </View>
      <ThemedText style={styles.title}>Correct!</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Great thinking — keep it up.
      </ThemedText>
      <View style={styles.reward}>
        <ThemedText style={[styles.rewardText, { color: theme.star }]}>+20 ⭐</ThemedText>
      </View>
      <GameButton label="Continue" onPress={handleNext} style={styles.btn} />
    </ModalOverlay>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontSize: 36,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  reward: {
    paddingVertical: Spacing.two,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    alignSelf: 'stretch',
    marginTop: Spacing.one,
  },
});
