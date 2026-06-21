import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function IncorrectModal() {
  const router = useRouter();
  const theme = useTheme();
  const { explanation, levelId, mode, difficulty, question } = useLocalSearchParams<{
    explanation: string;
    levelId: string;
    mode: string;
    difficulty: string;
    question?: string;
  }>();
  const { loseLife } = useGame();

  const tryAgain = () => {
    router.back();
  };

  const viewSolution = () => {
    loseLife();
    router.replace({
      pathname: '/solution',
      params: { explanation, levelId, mode, difficulty, question: question ?? '1' },
    });
  };

  return (
    <ModalOverlay>
      <View style={[styles.iconCircle, { backgroundColor: theme.errorBg }]}>
        <ThemedText style={[styles.x, { color: theme.error }]}>✕</ThemedText>
      </View>
      <ThemedText style={styles.title}>Not quite</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.desc}>
        Review the clues and try again, or view the solution.
      </ThemedText>
      <GameButton label="Try Again" onPress={tryAgain} style={styles.btn} />
      <GameButton label="View Solution" variant="outline" onPress={viewSolution} style={styles.btn} />
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
  x: {
    fontSize: 32,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  desc: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  btn: {
    alignSelf: 'stretch',
  },
});
