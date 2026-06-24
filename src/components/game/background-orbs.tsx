import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { hexAlpha } from '@/lib/color';

/** Soft ambient mesh behind screens. */
export function BackgroundOrbs() {
  const theme = useTheme();

  return (
    <View style={styles.container} pointerEvents="none">
      <View
        style={[
          styles.orb,
          styles.orb1,
          { backgroundColor: hexAlpha(theme.mesh1, 0.14) },
        ]}
      />
      <View
        style={[
          styles.orb,
          styles.orb2,
          { backgroundColor: hexAlpha(theme.mesh2, 0.1) },
        ]}
      />
      <View
        style={[
          styles.orb,
          styles.orb3,
          { backgroundColor: hexAlpha(theme.mesh3, 0.08) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orb1: {
    width: 280,
    height: 280,
    top: -100,
    right: -80,
  },
  orb2: {
    width: 200,
    height: 200,
    top: '38%',
    left: -70,
  },
  orb3: {
    width: 160,
    height: 160,
    bottom: 80,
    right: 20,
  },
});
