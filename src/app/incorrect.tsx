import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { GradientSurface } from '@/components/game/gradient-surface';
import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
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
      <GradientSurface
        colors={[theme.error, shadeHex(theme.error, -30)]}
        style={styles.iconCircle}>
        <SymbolView
          name={{ ios: 'xmark', android: 'close', web: 'close' }}
          size={32}
          tintColor="#FFFFFF"
        />
      </GradientSurface>
      <ThemedText style={styles.title}>Not quite</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.desc}>
        Review the clues and try again, or view the solution.
      </ThemedText>
      <GameButton label="Try again" onPress={tryAgain} style={styles.btn} />
      <GameButton label="View solution" variant="outline" onPress={viewSolution} style={styles.btn} />
    </ModalOverlay>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h1,
    fontSize: 26,
  },
  desc: {
    ...Typography.bodySm,
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'stretch',
  },
});
