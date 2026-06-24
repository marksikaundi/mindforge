import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { GameButton } from '@/components/game/game-button';
import { ModalOverlay } from '@/components/game/modal-overlay';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
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
      <View style={[styles.iconWrap, { backgroundColor: theme.accentSoft }]}>
        <SymbolView
          name={{ ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' }}
          size={28}
          tintColor={theme.star}
        />
      </View>
      <ThemedText style={styles.title}>Need a hint?</ThemedText>

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
            <ThemedText style={styles.price}>⭐ {hintCost}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.balance}>
              Balance: ⭐ {stars}
            </ThemedText>
          </View>
          <GameButton
            label="Get hint"
            onPress={buyHint}
            style={styles.btn}
            disabled={stars < hintCost}
          />
        </>
      )}

      <GameButton
        label={revealed ? 'Got it' : 'Cancel'}
        variant={revealed ? 'primary' : 'outline'}
        onPress={() => router.back()}
        style={styles.btn}
      />
    </ModalOverlay>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h2,
    textAlign: 'center',
  },
  desc: {
    ...Typography.bodySm,
    textAlign: 'center',
  },
  priceRow: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  price: {
    ...Typography.h3,
    fontWeight: '800',
  },
  balance: {
    ...Typography.caption,
  },
  hintBox: {
    width: '100%',
    padding: Spacing.three,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
  },
  hintText: {
    ...Typography.bodySm,
    lineHeight: 22,
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'stretch',
    minHeight: 48,
  },
});
