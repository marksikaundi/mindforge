import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/game/back-header';
import { CategoryBadge } from '@/components/game/category-badge';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { SegmentedControl } from '@/components/game/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Shadow, Spacing } from '@/constants/theme';
import { GAME_MODE_META } from '@/data/game-data';
import { Difficulty, GameMode, useGame } from '@/context/game-context';
import { QUESTIONS_PER_LEVEL } from '@/data/questions';
import { shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
const LEVEL_COUNT = 9;

export default function LevelSelectScreen() {
  const { mode } = useLocalSearchParams<{ mode: GameMode }>();
  const router = useRouter();
  const theme = useTheme();
  const { completedLevels } = useGame();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const gameMode = mode ?? 'puzzles';
  const meta = GAME_MODE_META[gameMode];
  const modeColor = MODE_COLORS[gameMode];

  const isUnlocked = (level: number) => {
    if (level === 1) return true;
    const prevKey = `${gameMode}-${difficulty}-${level - 1}`;
    return (completedLevels[prevKey] ?? 0) > 0;
  };

  const openLevel = (level: number) => {
    if (!isUnlocked(level)) return;
    router.push({
      pathname: '/gameplay/[levelId]',
      params: { levelId: String(level), mode: gameMode, difficulty, q: '1' },
    });
  };

  return (
    <ScreenContainer scroll ambient>
      <BackHeader title={meta.label} />

      <View style={styles.header}>
        <CategoryBadge mode={gameMode} />
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          {meta.description}
        </ThemedText>
      </View>

      <SegmentedControl
        options={DIFFICULTIES}
        value={difficulty}
        onChange={setDifficulty}
      />

      <ThemedText themeColor="textSecondary" style={styles.levelHint}>
        {QUESTIONS_PER_LEVEL} questions per level · earn up to 3 stars
      </ThemedText>

      <View style={styles.grid}>
        {Array.from({ length: LEVEL_COUNT }, (_, i) => {
          const level = i + 1;
          const key = `${gameMode}-${difficulty}-${level}`;
          const stars = completedLevels[key] ?? 0;
          const unlocked = isUnlocked(level);
          const completed = stars > 0;

          const cellContent = (
            <>
              {unlocked ? (
                <>
                  <ThemedText
                    style={[
                      styles.levelNum,
                      completed && { color: '#FFFFFF' },
                    ]}>
                    {level}
                  </ThemedText>
                  {completed ? (
                    <ThemedText style={styles.stars}>
                      {'★'.repeat(stars)}
                      {'☆'.repeat(3 - stars)}
                    </ThemedText>
                  ) : (
                    <ThemedText
                      style={[
                        styles.playLabel,
                        completed && { color: 'rgba(255,255,255,0.85)' },
                      ]}>
                      Play
                    </ThemedText>
                  )}
                </>
              ) : (
                <ThemedText style={styles.lock}>🔒</ThemedText>
              )}
            </>
          );

          return (
            <Pressable
              key={level}
              onPress={() => openLevel(level)}
              disabled={!unlocked}
              style={({ pressed }) => [
                styles.levelCell,
                !completed && Shadow.card as object,
                {
                  borderColor: completed ? 'transparent' : theme.border,
                  backgroundColor: unlocked && !completed ? theme.backgroundElement : theme.background,
                  opacity: !unlocked ? 0.4 : pressed ? 0.88 : 1,
                },
                completed && { borderWidth: 0 },
              ]}>
              {completed ? (
                <GradientSurface
                  colors={[modeColor, shadeHex(modeColor, -30)]}
                  style={styles.levelGradient}>
                  {cellContent}
                </GradientSurface>
              ) : (
                cellContent
              )}
            </Pressable>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  levelHint: {
    fontSize: 12,
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingBottom: Spacing.five,
  },
  levelCell: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  levelGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  levelNum: {
    fontSize: 28,
    fontWeight: '800',
  },
  stars: {
    fontSize: 11,
    color: '#FDE68A',
    letterSpacing: 1,
  },
  playLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  lock: {
    fontSize: 22,
  },
});
