import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ProgressBarProps = {
  progress: number;
  label?: string;
  height?: number;
  color?: string;
};

export function ProgressBar({ progress, label, height = 8, color }: ProgressBarProps) {
  const theme = useTheme();
  const clamped = Math.min(100, Math.max(0, progress));
  const fillColor = color ?? theme.accent;

  return (
    <View style={styles.wrapper}>
      {label && (
        <View style={styles.labelRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Progress
          </ThemedText>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {label}
          </ThemedText>
        </View>
      )}
      <View style={[styles.track, { backgroundColor: theme.border, height }]}>
        <View
          style={[styles.fill, { backgroundColor: fillColor, width: `${clamped}%`, height }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
});
