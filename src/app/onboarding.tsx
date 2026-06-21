import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { ONBOARDING_STEPS } from '@/data/game-data';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);

  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;

  const finish = () => {
    completeOnboarding();
    router.replace('/login');
  };

  const next = () => {
    if (isLast) finish();
    else setStep((s) => s + 1);
  };

  return (
    <ScreenContainer>
      <Pressable onPress={finish} style={styles.skip}>
        <ThemedText themeColor="textSecondary" type="smallBold">
          Skip
        </ThemedText>
      </Pressable>

      <View style={styles.content}>
        <View style={[styles.emojiCircle, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText style={styles.emoji}>{current.emoji}</ThemedText>
        </View>
        <ThemedText style={styles.title}>{current.title}</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          {current.description}
        </ThemedText>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {ONBOARDING_STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === step ? theme.accent : theme.border },
                i === step && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <Pressable
          onPress={next}
          style={[styles.nextButton, { backgroundColor: theme.accent }]}>
          <ThemedText style={styles.nextLabel}>{isLast ? 'Get Started' : 'Next'}</ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  skip: {
    alignSelf: 'flex-end',
    padding: Spacing.two,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  emojiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  footer: {
    gap: Spacing.four,
    paddingBottom: Spacing.five,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  nextButton: {
    paddingVertical: Spacing.three,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  nextLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
