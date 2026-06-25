import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { GameModeCard } from '@/components/ui/game-mode-card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedView } from '@/components/themed-view';
import { GAME_MODES } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

export default function GameModesScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Game Modes" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll}>
        {GAME_MODES.map((mode) => (
          <GameModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            icon={mode.icon}
            color={mode.color}
            completed={mode.completedLevels}
            total={mode.totalLevels}
            onPress={() => {
              if (mode.id === 'ai-challenges') {
                router.push('/case/mysterious-disappearance');
              } else {
                router.push(`/challenge/${mode.id}`);
              }
            }}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.three,
    gap: Spacing.two,
    paddingBottom: Spacing.six,
  },
});
