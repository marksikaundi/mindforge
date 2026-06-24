import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { GradientSurface } from '@/components/game/gradient-surface';
import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
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
      <GradientSurface
        colors={[theme.success, shadeHex(theme.success, -30)]}
        style={styles.iconCircle}>
        <SymbolView
          name={{ ios: 'checkmark', android: 'check', web: 'check' }}
          size={36}
          tintColor="#FFFFFF"
        />
      </GradientSurface>
      <ThemedText style={styles.title}>Correct!</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Sharp thinking — keep the momentum going.
      </ThemedText>
      <View style={[styles.reward, { backgroundColor: theme.accentSoft }]}>
        <ThemedText style={[styles.rewardText, { color: theme.star }]}>+20 ⭐</ThemedText>
      </View>
      <GameButton label="Continue" onPress={handleNext} style={styles.btn} />
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
  subtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
  },
  reward: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: BorderRadius.full,
  },
  rewardText: {
    ...Typography.h3,
    fontWeight: '800',
  },
  btn: {
    alignSelf: 'stretch',
    marginTop: Spacing.one,
  },
});
