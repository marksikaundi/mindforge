import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { ProgressBar } from '@/components/game/progress-bar';
import { ScreenContainer } from '@/components/game/screen-container';
import { SectionHeader } from '@/components/game/section-header';
import { SkillBar } from '@/components/game/skill-bar';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function ProgressScreen() {
  const theme = useTheme();
  const { level, xp, xpToNextLevel, skills } = useGame();
  const xpPercent = (xp / xpToNextLevel) * 100;

  return (
    <ScreenContainer scroll>
      <ThemedText style={styles.title}>Your Progress</ThemedText>

      <Card accent={theme.accent} style={styles.levelCard}>
        <View style={[styles.levelCircle, { borderColor: theme.accent, backgroundColor: theme.backgroundSelected }]}>
          <ThemedText themeColor="textSecondary" style={styles.levelLabel}>
            LEVEL
          </ThemedText>
          <ThemedText style={[styles.levelNumber, { color: theme.accent }]}>{level}</ThemedText>
        </View>

        <View style={styles.xpSection}>
          <ThemedText type="smallBold">Experience</ThemedText>
          <ProgressBar progress={xpPercent} color={theme.accent} />
          <ThemedText type="small" themeColor="textSecondary">
            {xp} / {xpToNextLevel} XP to next level
          </ThemedText>
        </View>
      </Card>

      <SectionHeader title="Skill Breakdown" subtitle="Based on your category performance" />

      <View style={styles.skills}>
        <SkillBar name="Logic" percent={skills.logic} />
        <SkillBar name="Analysis" percent={skills.analysis} />
        <SkillBar name="Problem Solving" percent={skills.problemSolving} />
        <SkillBar name="Decision Making" percent={skills.decisionMaking} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: Spacing.four,
    marginTop: Spacing.two,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    marginBottom: Spacing.five,
  },
  levelCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: '800',
  },
  xpSection: {
    flex: 1,
    gap: Spacing.two,
  },
  skills: {
    gap: Spacing.four,
    paddingBottom: Spacing.five,
  },
});
