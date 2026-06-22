import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ProgressBar } from '@/components/game/progress-bar';
import { ScreenContainer } from '@/components/game/screen-container';
import { ScreenHeader } from '@/components/game/screen-header';
import { SectionHeader } from '@/components/game/section-header';
import { SkillBar } from '@/components/game/skill-bar';
import { StatChip } from '@/components/game/stat-chip';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function ProgressScreen() {
  const theme = useTheme();
  const { level, xp, xpToNextLevel, skills, streakDays, completedLevels } = useGame();
  const xpPercent = (xp / xpToNextLevel) * 100;
  const levelsCompleted = Object.values(completedLevels).filter((s) => s > 0).length;

  return (
    <ScreenContainer scroll ambient>
      <ScreenHeader title="Your progress" subtitle="Track growth across all skill areas" />

      <Card accent={theme.accent} style={styles.levelCard}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -35)]}
          style={styles.levelCircle}>
          <ThemedText style={styles.levelLabel}>LEVEL</ThemedText>
          <ThemedText style={styles.levelNumber}>{level}</ThemedText>
        </GradientSurface>

        <View style={styles.xpSection}>
          <ThemedText style={styles.xpTitle}>Experience</ThemedText>
          <ProgressBar progress={xpPercent} color={theme.accent} height={8} />
          <ThemedText themeColor="textSecondary" style={styles.xpSub}>
            {xp} / {xpToNextLevel} XP to level {level + 1}
          </ThemedText>
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatChip icon="🔥" value={`${streakDays} day streak`} tint={theme.flame} />
        <StatChip icon="✅" value={`${levelsCompleted} levels`} tint={MODE_COLORS.decisions} />
      </View>

      <SectionHeader title="Skill breakdown" subtitle="Based on your category performance" />

      <View style={styles.skills}>
        <SkillBar name="Logic" percent={skills.logic} color={MODE_COLORS.logic} />
        <SkillBar name="Analysis" percent={skills.analysis} color={MODE_COLORS.analyze} />
        <SkillBar name="Problem Solving" percent={skills.problemSolving} color={MODE_COLORS.puzzles} />
        <SkillBar name="Decision Making" percent={skills.decisionMaking} color={MODE_COLORS.decisions} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    marginBottom: Spacing.three,
  },
  levelCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  levelNumber: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  xpSection: {
    flex: 1,
    gap: Spacing.two,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  xpSub: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  skills: {
    gap: Spacing.four,
    paddingBottom: Spacing.five,
  },
});
