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
import { MODE_COLORS, Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function ProgressScreen() {
  const theme = useTheme();
  const { level, xp, xpToNextLevel, skills, streakDays, completedLevels } = useGame();
  const xpPercent = (xp / xpToNextLevel) * 100;
  const levelsCompleted = Object.values(completedLevels).filter((s) => s > 0).length;

  return (
    <ScreenContainer scroll ambient tabInset>
      <ScreenHeader title="Progress" subtitle="Your cognitive growth at a glance" />

      <Card accent={theme.accent} style={styles.levelCard}>
        <GradientSurface
          colors={[theme.accent, shadeHex(theme.accent, -35)]}
          style={styles.levelRing}>
          <ThemedText style={styles.levelLabel}>Level</ThemedText>
          <ThemedText style={styles.levelNumber}>{level}</ThemedText>
        </GradientSurface>

        <View style={styles.xpSection}>
          <ThemedText style={styles.xpTitle}>Experience</ThemedText>
          <ProgressBar progress={xpPercent} color={theme.accent} height={10} />
          <ThemedText themeColor="textSecondary" style={styles.xpSub}>
            {xp} / {xpToNextLevel} XP · next level {level + 1}
          </ThemedText>
        </View>
      </Card>

      <View style={styles.statsRow}>
        <StatChip
          symbol={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
          value={`${streakDays} day streak`}
          tint={theme.flame}
        />
        <StatChip
          symbol={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
          value={`${levelsCompleted} levels`}
          tint={MODE_COLORS.decisions}
        />
      </View>

      <SectionHeader title="Skill profile" subtitle="Performance across categories" />

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
  levelRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLabel: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  levelNumber: {
    ...Typography.h1,
    color: '#FFFFFF',
    lineHeight: 36,
  },
  xpSection: {
    flex: 1,
    gap: Spacing.two,
  },
  xpTitle: {
    ...Typography.bodySm,
    fontWeight: '700',
  },
  xpSub: {
    ...Typography.caption,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  skills: {
    gap: Spacing.four,
  },
});
