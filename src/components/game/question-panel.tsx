import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { QuestionVisual, SHAPE_EMOJI } from '@/data/questions';
import { useTheme } from '@/hooks/use-theme';

type QuestionPanelProps = {
  visual?: QuestionVisual;
};

export function QuestionPanel({ visual }: QuestionPanelProps) {
  const theme = useTheme();

  if (!visual) return null;

  if (visual.kind === 'shapes') {
    return (
      <View style={styles.wrap}>
        <View style={styles.sequence}>
          {visual.sequence.map((shape, i) => (
            <View key={i} style={[styles.shapeBox, { borderColor: theme.border, backgroundColor: theme.background }]}>
              <ThemedText style={styles.shapeEmoji}>{SHAPE_EMOJI[shape]}</ThemedText>
            </View>
          ))}
          <View style={[styles.shapeBox, styles.missing, { borderColor: theme.accent }]}>
            <ThemedText style={[styles.questionMark, { color: theme.accent }]}>?</ThemedText>
          </View>
        </View>
      </View>
    );
  }

  if (visual.kind === 'numbers') {
    return (
      <View style={[styles.numberRow, { backgroundColor: theme.background, borderColor: theme.border }]}>
        {visual.sequence.map((num, i) => (
          <View key={i} style={styles.numberCell}>
            <ThemedText style={styles.number}>{num}</ThemedText>
            {i < visual.sequence.length - 1 && (
              <ThemedText themeColor="textSecondary" style={styles.arrow}>
                →
              </ThemedText>
            )}
          </View>
        ))}
        <ThemedText style={[styles.number, styles.questionMark, { color: theme.accent }]}>?</ThemedText>
      </View>
    );
  }

  if (visual.kind === 'clues') {
    return (
      <View style={styles.clues}>
        {visual.items.map((clue, i) => (
          <View
            key={i}
            style={[styles.clueRow, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <View style={[styles.clueDot, { backgroundColor: theme.accent }]} />
            <ThemedText style={styles.clueText}>{clue}</ThemedText>
          </View>
        ))}
      </View>
    );
  }

  if (visual.kind === 'scenario') {
    return (
      <View style={[styles.scenario, { backgroundColor: theme.background, borderColor: theme.border }]}>
        <ThemedText style={styles.scenarioText}>{visual.text}</ThemedText>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  sequence: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  shapeBox: {
    width: 52,
    height: 52,
    borderWidth: 1.5,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missing: {
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  shapeEmoji: {
    fontSize: 26,
  },
  questionMark: {
    fontSize: 22,
    fontWeight: '800',
  },
  numberRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  numberCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  number: {
    fontSize: 22,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  arrow: {
    fontSize: 16,
  },
  clues: {
    gap: Spacing.two,
    width: '100%',
  },
  clueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  clueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  clueText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  scenario: {
    padding: Spacing.four,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    width: '100%',
  },
  scenarioText: {
    fontSize: 15,
    lineHeight: 24,
  },
});
