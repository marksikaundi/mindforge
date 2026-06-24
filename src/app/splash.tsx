import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { BackgroundOrbs } from '@/components/game/background-orbs';
import { SplashLoader } from '@/components/splash/splash-loader';
import { SplashLogo } from '@/components/splash/splash-logo';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

const MODE_TAGS = [
  { label: 'Puzzles', color: MODE_COLORS.puzzles },
  { label: 'Logic', color: MODE_COLORS.logic },
  { label: 'Analyze', color: MODE_COLORS.analyze },
  { label: 'Decisions', color: MODE_COLORS.decisions },
];

export default function SplashScreenRoute() {
  const router = useRouter();
  const theme = useTheme();
  const { hasOnboarded } = useGame();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  const navigateNext = useCallback(() => {
    if (!hasOnboarded) {
      router.replace('/onboarding');
      return;
    }
    router.replace('/(tabs)');
  }, [hasOnboarded, router]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <BackgroundOrbs />

      <View style={styles.content}>
        <SplashLogo />

        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.titleBlock}>
          <ThemedText style={styles.title}>Think Smart</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>
            Challenge your mind · Train daily
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.tags}>
          {MODE_TAGS.map((tag, i) => (
            <Animated.View key={tag.label} entering={FadeIn.delay(700 + i * 80).duration(400)}>
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: hexAlpha(tag.color, 0.12),
                    borderColor: hexAlpha(tag.color, 0.25),
                  },
                ]}>
                <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
                <ThemedText style={[styles.tagText, { color: tag.color }]}>{tag.label}</ThemedText>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.delay(900).duration(500)} style={styles.footer}>
        <SplashLoader
          durationMs={2800}
          onComplete={() => {
            setReady(true);
            navigateNext();
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  titleBlock: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  title: {
    ...Typography.display,
  },
  subtitle: {
    ...Typography.bodySm,
    textAlign: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.five,
    maxWidth: 320,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.one + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    ...Typography.caption,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: Spacing.five,
    paddingBottom: Spacing.six,
  },
});
