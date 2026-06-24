import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';

import { BackgroundOrbs } from '@/components/game/background-orbs';
import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing, Typography } from '@/constants/theme';
import { ONBOARDING_STEPS } from '@/data/game-data';
import { useGame } from '@/context/game-context';
import { hexAlpha, shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

const STEP_ACCENTS = [MODE_COLORS.puzzles, MODE_COLORS.logic, MODE_COLORS.decisions];

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);

  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const accent = STEP_ACCENTS[step] ?? theme.accent;

  const finish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const next = () => {
    if (isLast) finish();
    else setStep((s) => s + 1);
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <BackgroundOrbs />

      <View style={styles.container}>
        <Animated.View entering={FadeIn.duration(400)} style={styles.topBar}>
          <ThemedText style={styles.brand}>Think Smart</ThemedText>
          <Pressable onPress={finish} hitSlop={12}>
            <ThemedText themeColor="textSecondary" style={styles.skip}>
              Skip
            </ThemedText>
          </Pressable>
        </Animated.View>

        <View style={styles.content}>
          <Animated.View key={step} entering={FadeInRight.duration(380)} style={styles.stepWrap}>
            <Card accent={accent} style={styles.stepCard} padded={false}>
              <View style={styles.cardInner}>
                <GradientSurface
                  colors={[hexAlpha(accent, 0.2), hexAlpha(accent, 0.05)]}
                  style={styles.emojiCircle}>
                  <ThemedText style={styles.emoji}>{current.emoji}</ThemedText>
                </GradientSurface>
                <ThemedText themeColor="textSecondary" style={styles.stepLabel}>
                  Step {step + 1} of {ONBOARDING_STEPS.length}
                </ThemedText>
                <ThemedText style={styles.title}>{current.title}</ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.description}>
                  {current.description}
                </ThemedText>
              </View>
            </Card>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {ONBOARDING_STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === step ? accent : theme.borderSubtle,
                    width: i === step ? 32 : 8,
                  },
                ]}
              />
            ))}
          </View>

          <GameButton
            label={isLast ? 'Get started' : 'Continue'}
            onPress={next}
            size="lg"
            style={styles.nextBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.five,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  brand: {
    ...Typography.h3,
    letterSpacing: -0.3,
  },
  skip: {
    ...Typography.bodySm,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  stepWrap: {
    width: '100%',
  },
  stepCard: {
    width: '100%',
  },
  cardInner: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  emojiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 52,
  },
  stepLabel: {
    ...Typography.label,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    maxWidth: 300,
  },
  footer: {
    gap: Spacing.four,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    height: 12,
  },
  dot: {
    height: 8,
    borderRadius: BorderRadius.full,
  },
  nextBtn: {
    width: '100%',
  },
});
