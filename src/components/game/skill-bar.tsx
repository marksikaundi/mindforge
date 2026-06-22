import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ProgressBar } from '@/components/game/progress-bar';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SkillBarProps = {
  name: string;
  percent: number;
  color?: string;
};

export function SkillBar({ name, percent, color }: SkillBarProps) {
  const theme = useTheme();
  const barColor = color ?? theme.accent;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={[styles.percent, { color: barColor }]}>{percent}%</ThemedText>
      </View>
      <ProgressBar progress={percent} height={8} color={barColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  percent: {
    fontSize: 14,
    fontWeight: '700',
  },
});
