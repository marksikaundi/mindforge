import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GameHeader } from '@/components/game/game-header';
import { ScreenContainer } from '@/components/game/screen-container';
import { SectionHeader } from '@/components/game/section-header';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing } from '@/constants/theme';
import { GAME_MODES } from '@/data/game-data';
import { GameMode } from '@/context/game-context';

export default function HomeScreen() {
  const router = useRouter();

  const openMode = (mode: GameMode) => {
    router.push({ pathname: '/level-select', params: { mode } });
  };

  return (
    <ScreenContainer scroll>
      <GameHeader />

      <ThemedText style={styles.greeting}>Ready to think smarter?</ThemedText>

      <Card accent={MODE_COLORS.puzzles} style={styles.dailyCard}>
        <View style={styles.dailyTop}>
          <View>
            <ThemedText style={styles.dailyLabel}>Daily Challenge</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.dailyDesc}>
              One special puzzle · compete worldwide
            </ThemedText>
          </View>
          <ThemedText style={styles.dailyEmoji}>📅</ThemedText>
        </View>
        <GameButton
          label="Play Challenge"
          onPress={() => router.push('/daily-challenge')}
          style={styles.dailyBtn}
        />
      </Card>

      <SectionHeader title="Game Modes" subtitle="Pick a category to train a specific skill" />

      <View style={styles.modeGrid}>
        {GAME_MODES.map((mode) => (
          <Pressable
            key={mode.id}
            onPress={() => openMode(mode.id)}
            style={({ pressed }) => [styles.modeWrap, { opacity: pressed ? 0.85 : 1 }]}>
            <Card
              accent={MODE_COLORS[mode.id]}
              style={styles.modeCard}
              padded>
              <ThemedText style={styles.modeEmoji}>{mode.emoji}</ThemedText>
              <ThemedText style={styles.modeLabel}>{mode.label}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.modeDesc}>
                {mode.description}
              </ThemedText>
            </Card>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => router.push('/achievements')} style={styles.achievementsLink}>
        <ThemedText style={styles.achievementsText}>🏆 View Achievements</ThemedText>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: Spacing.three,
    marginTop: Spacing.one,
  },
  dailyCard: {
    marginBottom: Spacing.five,
    gap: Spacing.three,
  },
  dailyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dailyLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: Spacing.one,
  },
  dailyDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  dailyEmoji: {
    fontSize: 32,
  },
  dailyBtn: {
    minHeight: 48,
  },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  modeWrap: {
    width: '47%',
  },
  modeCard: {
    gap: Spacing.one,
    minHeight: 130,
  },
  modeEmoji: {
    fontSize: 28,
    marginBottom: Spacing.one,
  },
  modeLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  modeDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  achievementsLink: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
  achievementsText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
