import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const LOADING_STEPS = [
  'Initializing brain training…',
  'Loading puzzle engine…',
  'Preparing daily challenges…',
  'Almost ready…',
];

type SplashLoaderProps = {
  durationMs?: number;
  onComplete?: () => void;
};

export function SplashLoader({ durationMs = 2800, onComplete }: SplashLoaderProps) {
  const theme = useTheme();
  const progress = useSharedValue(0);
  const [stepIndex, setStepIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    progress.value = withTiming(1, { duration: durationMs, easing: Easing.out(Easing.cubic) });
    const stepInterval = durationMs / LOADING_STEPS.length;
    const timers = LOADING_STEPS.map((_, i) =>
      setTimeout(() => setStepIndex(i), stepInterval * i),
    );
    const done = setTimeout(() => onCompleteRef.current?.(), durationMs);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [durationMs, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.wrap}>
      <View style={[styles.track, { backgroundColor: theme.border }]}>
        <Animated.View
          style={[styles.fill, { backgroundColor: theme.accent }, fillStyle]}
        />
      </View>
      <ThemedText themeColor="textSecondary" style={styles.status}>
        {LOADING_STEPS[stepIndex]}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: 280,
    gap: Spacing.two,
    marginTop: Spacing.six,
  },
  track: {
    height: 6,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  status: {
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
