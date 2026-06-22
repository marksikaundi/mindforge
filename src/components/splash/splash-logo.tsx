import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SplashLogo() {
  const theme = useTheme();
  const float = useSharedValue(0);
  const glow = useSharedValue(0.4);
  const scale = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 90 });
    float.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(6, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(0.75, { duration: 1400 }),
        withTiming(0.35, { duration: 1400 }),
      ),
      -1,
      true,
    );
  }, [float, glow, scale]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }, { scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 1 + glow.value * 0.25 }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${float.value * 4}deg` }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.wrap}>
      <Animated.View
        style={[
          styles.glowRing,
          { backgroundColor: `${theme.accent}30`, borderColor: `${theme.accent}40` },
          glowStyle,
          ringStyle,
        ]}
      />
      <Animated.View style={[styles.slab, { backgroundColor: theme.accentMuted }]} />
      <Animated.View
        style={[
          styles.logoBox,
          logoStyle,
          {
            backgroundColor: theme.accent,
            shadowColor: theme.accent,
          },
        ]}>
        <View style={styles.shine} />
        <Animated.Text style={styles.brain}>🧠</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  glowRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
  },
  slab: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    top: 28,
    opacity: 0.55,
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 14,
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  brain: {
    fontSize: 48,
  },
});
