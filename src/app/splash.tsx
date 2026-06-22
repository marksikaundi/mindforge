import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

import { BackgroundOrbs } from '@/components/game/background-orbs';
import { SplashLoader } from '@/components/splash/splash-loader';
import { SplashLogo } from '@/components/splash/splash-logo';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

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
          {['Puzzles', 'Logic', 'Analyze', 'Decisions'].map((tag, i) => (
            <Animated.View
              key={tag}
              entering={FadeIn.delay(700 + i * 80).duration(400)}
              style={[styles.tag, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <ThemedText style={styles.tagText}>{tag}</ThemedText>
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
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
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
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    paddingHorizontal: Spacing.five,
    paddingBottom: Spacing.six,
  },
});
