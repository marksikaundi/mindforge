import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function HintModal() {
  const router = useRouter();
  const theme = useTheme();
  const { stars, spendStars } = useGame();
  const { hint, cost } = useLocalSearchParams<{ hint: string; cost?: string }>();
  const [revealed, setRevealed] = useState(false);

  const hintCost = parseInt(cost ?? '50', 10);

  const buyHint = () => {
    if (spendStars(hintCost)) {
      setRevealed(true);
    }
  };

  return (
    <ModalOverlay onDismiss={() => router.back()}>
      <ThemedText style={styles.emoji}>💡</ThemedText>
      <ThemedText style={styles.title}>Need a Hint?</ThemedText>

      {revealed ? (
        <View style={[styles.hintBox, { backgroundColor: theme.backgroundSelected, borderColor: theme.accent }]}>
          <ThemedText style={styles.hintText}>{hint ?? 'Look carefully at the pattern.'}</ThemedText>
        </View>
      ) : (
        <>
          <ThemedText themeColor="textSecondary" style={styles.desc}>
            Spend stars to reveal a clue for this question.
          </ThemedText>
          <View style={styles.priceRow}>
            <ThemedText type="smallBold">⭐ {hintCost}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Balance: ⭐ {stars}
            </ThemedText>
          </View>
          <GameButton
            label="GET HINT"
            onPress={buyHint}
            style={styles.btn}
            disabled={stars < hintCost}
          />
        </>
      )}

      <GameButton
        label={revealed ? 'GOT IT' : 'CANCEL'}
        variant={revealed ? 'primary' : 'outline'}
        onPress={() => router.back()}
        style={styles.btn}
      />
    </ModalOverlay>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  priceRow: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  hintBox: {
    width: '100%',
    padding: Spacing.three,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  hintText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'stretch',
    minHeight: 48,
  },
});
