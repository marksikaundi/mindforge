import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

type ProgressBarProps = {
  current: number;
  max: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
};

export function ProgressBar({
  current,
  max,
  color = Brand.primary,
  height = 8,
  showLabel,
  label,
}: ProgressBarProps) {
  const progress = Math.min(current / max, 1);

  return (
    <View style={styles.container}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && (
            <ThemedText type="small" themeColor="textSecondary">
              {label}
            </ThemedText>
          )}
          {showLabel && (
            <ThemedText type="small" themeColor="textSecondary">
              {current}/{max}
            </ThemedText>
          )}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: color, height }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    backgroundColor: 'rgba(108, 92, 231, 0.15)',
    borderRadius: 100,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 100,
  },
});
