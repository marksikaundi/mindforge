import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GameHeader } from '@/components/game/game-header';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { SectionHeader } from '@/components/game/section-header';
import { StatChip } from '@/components/game/stat-chip';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing } from '@/constants/theme';
import { GAME_MODES } from '@/data/game-data';
import { GameMode, useGame } from '@/context/game-context';
import { hexAlpha, shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { displayName, streakDays, level, xp, xpToNextLevel } = useGame();

  const openMode = (mode: GameMode) => {
    router.push({ pathname: '/level-select', params: { mode } });
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <ScreenContainer scroll ambient>
      <GameHeader />

      <View style={styles.greetingBlock}>
        <ThemedText themeColor="textSecondary" style={styles.greetingLabel}>
          {greeting}, {displayName}
        </ThemedText>
        <ThemedText style={styles.greetingTitle}>Ready to train your mind?</ThemedText>
        <View style={styles.quickStats}>
          <StatChip icon="📈" value={`Lv ${level}`} tint={theme.accent} />
          <StatChip icon="🔥" value={`${streakDays}d streak`} tint={theme.flame} />
          <StatChip icon="✨" value={`${xp}/${xpToNextLevel} XP`} tint={theme.star} />
        </View>
      </View>

      <Card variant="hero" accent={MODE_COLORS.puzzles} style={styles.dailyCard}>
        <View style={styles.dailyTop}>
          <View style={styles.dailyText}>
            <ThemedText style={styles.dailyBadge}>TODAY</ThemedText>
            <ThemedText style={styles.dailyLabel}>Daily Challenge</ThemedText>
            <ThemedText style={styles.dailyDesc}>
              One curated puzzle · compete with players worldwide
            </ThemedText>
          </View>
          <View style={styles.dailyIconWrap}>
            <ThemedText style={styles.dailyEmoji}>🧠</ThemedText>
          </View>
        </View>
        <GameButton
          label="Play Challenge"
          light
          variant="secondary"
          onPress={() => router.push('/daily-challenge')}
          style={styles.dailyBtn}
        />
      </Card>

      <SectionHeader title="Training modes" subtitle="Build skills across four core areas" />

      <View style={styles.modeGrid}>
        {GAME_MODES.map((mode) => {
          const color = MODE_COLORS[mode.id];
          return (
            <Card
              key={mode.id}
              accent={color}
              onPress={() => openMode(mode.id)}
              style={styles.modeCard}>
              <GradientSurface
                colors={[hexAlpha(color, 0.2), hexAlpha(color, 0.05)]}
                style={styles.modeIconBg}>
                <ThemedText style={styles.modeEmoji}>{mode.emoji}</ThemedText>
              </GradientSurface>
              <ThemedText style={styles.modeLabel}>{mode.label}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.modeDesc}>
                {mode.description}
              </ThemedText>
            </Card>
          );
        })}
      </View>

      <Card accent={MODE_COLORS.decisions} onPress={() => router.push('/achievements')}>
        <View style={styles.achRow}>
          <GradientSurface
            colors={[MODE_COLORS.decisions, shadeHex(MODE_COLORS.decisions, -30)]}
            style={styles.achIcon}>
            <ThemedText style={styles.achEmoji}>🏆</ThemedText>
          </GradientSurface>
          <View style={styles.achText}>
            <ThemedText style={styles.achTitle}>Achievements</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.achSub}>
              Track milestones and unlock rewards
            </ThemedText>
          </View>
          <ThemedText themeColor="textSecondary" style={styles.chevron}>
            ›
          </ThemedText>
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greetingBlock: {
    marginBottom: Spacing.four,
    gap: Spacing.one,
  },
  greetingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: Spacing.two,
  },
  quickStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  dailyCard: {
    marginBottom: Spacing.five,
  },
  dailyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.four,
  },
  dailyText: {
    flex: 1,
    paddingRight: Spacing.two,
  },
  dailyBadge: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: Spacing.one,
  },
  dailyLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: Spacing.one,
  },
  dailyDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 20,
  },
  dailyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyEmoji: {
    fontSize: 28,
  },
  dailyBtn: {
    minHeight: 48,
  },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  modeCard: {
    width: '47%',
    gap: Spacing.two,
    minHeight: 148,
  },
  modeIconBg: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeEmoji: {
    fontSize: 24,
  },
  modeLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  modeDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  achRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },
  achIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achEmoji: {
    fontSize: 24,
  },
  achText: {
    flex: 1,
    gap: 2,
  },
  achTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  achSub: {
    fontSize: 13,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 28,
    fontWeight: '300',
  },
});
