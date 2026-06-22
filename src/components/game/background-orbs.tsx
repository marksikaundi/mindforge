import { StyleSheet, View } from 'react-native';

import { MODE_COLORS } from '@/constants/theme';

/** Soft floating orbs that add depth behind splash and onboarding. */
export function BackgroundOrbs() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.orb, styles.orb1, { backgroundColor: `${MODE_COLORS.puzzles}18` }]} />
      <View style={[styles.orb, styles.orb2, { backgroundColor: `${MODE_COLORS.logic}14` }]} />
      <View style={[styles.orb, styles.orb3, { backgroundColor: `${MODE_COLORS.analyze}12` }]} />
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
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  orb1: {
    width: 220,
    height: 220,
    top: -60,
    right: -70,
  },
  orb2: {
    width: 160,
    height: 160,
    top: 280,
    left: -50,
  },
  orb3: {
    width: 120,
    height: 120,
    bottom: 120,
    right: 30,
  },
});
