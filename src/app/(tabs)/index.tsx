import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GameHeader } from '@/components/game/game-header';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ModeIcon } from '@/components/game/mode-icon';
import { ScreenContainer } from '@/components/game/screen-container';
import { SectionHeader } from '@/components/game/section-header';
import { StatChip } from '@/components/game/stat-chip';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing, Typography } from '@/constants/theme';
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
    <ScreenContainer scroll ambient tabInset>
      <GameHeader />

      <View style={styles.heroSection}>
        <ThemedText themeColor="textSecondary" style={styles.greetingLabel}>
          {greeting}, {displayName}
        </ThemedText>
        <ThemedText style={styles.greetingTitle}>Train your mind today</ThemedText>
        <View style={styles.quickStats}>
          <StatChip
            symbol={{ ios: 'chart.line.uptrend.xyaxis', android: 'trending_up', web: 'trending_up' }}
            value={`Lv ${level}`}
            tint={theme.accent}
          />
          <StatChip
            symbol={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
            value={`${streakDays}d`}
            tint={theme.flame}
          />
          <StatChip
            symbol={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
            value={`${xp}/${xpToNextLevel}`}
            tint={theme.star}
          />
        </View>
      </View>

      <GradientSurface
        colors={[theme.accent, shadeHex(theme.accent, -40)]}
        style={styles.dailyHero}>
        <View style={styles.dailyGlow} />
        <View style={styles.dailyContent}>
          <View style={styles.dailyText}>
            <ThemedText style={styles.dailyBadge}>Daily challenge</ThemedText>
            <ThemedText style={styles.dailyTitle}>One puzzle. Global ranks.</ThemedText>
            <ThemedText style={styles.dailyDesc}>
              Curated by our team · refreshed every 24 hours
            </ThemedText>
          </View>
          <View style={styles.dailyIcon}>
            <SymbolView
              name={{ ios: 'brain.head.profile', android: 'psychology', web: 'psychology' }}
              size={32}
              tintColor="#FFFFFF"
            />
          </View>
        </View>
        <GameButton
          label="Play now"
          light
          variant="secondary"
          onPress={() => router.push('/daily-challenge')}
          style={styles.dailyBtn}
        />
      </GradientSurface>

      <SectionHeader title="Training modes" subtitle="Four core skills to master" />

      <View style={styles.modeGrid}>
        {GAME_MODES.map((mode) => {
          const color = MODE_COLORS[mode.id];
          return (
            <Card key={mode.id} accent={color} onPress={() => openMode(mode.id)} style={styles.modeCard}>
              <ModeIcon mode={mode.id} color={color} />
              <ThemedText style={styles.modeLabel}>{mode.label}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.modeDesc} numberOfLines={2}>
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
            <SymbolView
              name={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
              size={22}
              tintColor="#FFFFFF"
            />
          </GradientSurface>
          <View style={styles.achText}>
            <ThemedText style={styles.achTitle}>Achievements</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.achSub}>
              Milestones, badges, and rewards
            </ThemedText>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={18}
            tintColor={theme.textSecondary}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    marginBottom: Spacing.four,
    gap: Spacing.one,
  },
  greetingLabel: {
    ...Typography.bodySm,
    fontWeight: '600',
  },
  greetingTitle: {
    ...Typography.h1,
    marginBottom: Spacing.two,
  },
  quickStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  dailyHero: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.four,
    marginBottom: Spacing.five,
    overflow: 'hidden',
    gap: Spacing.four,
  },
  dailyGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dailyContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  dailyText: {
    flex: 1,
    gap: Spacing.one,
  },
  dailyBadge: {
    ...Typography.label,
    color: 'rgba(255,255,255,0.75)',
  },
  dailyTitle: {
    ...Typography.h2,
    color: '#FFFFFF',
  },
  dailyDesc: {
    ...Typography.bodySm,
    color: 'rgba(255,255,255,0.82)',
  },
  dailyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: hexAlpha('#FFFFFF', 0.18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyBtn: {
    alignSelf: 'stretch',
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
    minHeight: 140,
  },
  modeLabel: {
    ...Typography.bodySm,
    fontWeight: '800',
  },
  modeDesc: {
    ...Typography.caption,
    lineHeight: 17,
  },
  achRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  achIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achText: {
    flex: 1,
    gap: 2,
  },
  achTitle: {
    ...Typography.bodySm,
    fontWeight: '700',
  },
  achSub: {
    ...Typography.caption,
  },
});
