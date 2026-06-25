import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameModeCard } from '@/components/ui/game-mode-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, GAME_MODES } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';

export default function HomeScreen() {
  const router = useRouter();
  const user = useUser();

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader showMenu showNotifications />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar emoji={user.avatar} size={56} showLevel level={user.level} />
            <View style={styles.profileInfo}>
              <ThemedText style={styles.username}>{user.username}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Level {user.level}
              </ThemedText>
              <ProgressBar
                current={user.xpCurrent}
                max={user.xpMax}
                showLabel
                label={`${user.xpCurrent} / ${user.xpMax} XP`}
              />
            </View>
          </View>
        </Card>

        <Card accent={Brand.primary} style={styles.challengeCard}>
          <ThemedText type="smallBold" style={styles.challengeLabel}>
            TODAY&apos;S CHALLENGE
          </ThemedText>
          <ThemedText style={styles.challengeTitle}>Logical Fallacy</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
            Identify the flaw in today&apos;s argument and earn bonus XP
          </ThemedText>
          <Button
            title="PLAY"
            onPress={() => router.push('/challenge/logical-fallacies')}
            style={styles.playButton}
          />
        </Card>

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Game Modes</ThemedText>
          <ThemedText
            type="linkPrimary"
            onPress={() => router.push('/game-modes')}
            style={styles.seeAll}>
            See All
          </ThemedText>
        </View>

        <View style={styles.modesGrid}>
          {GAME_MODES.map((mode) => (
            <GameModeCard
              key={mode.id}
              title={mode.title.split(' ')[0]}
              icon={mode.icon}
              color={mode.color}
              compact
              onPress={() => router.push(`/challenge/${mode.id}`)}
            />
          ))}
        </View>
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
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  profileCard: {
    marginTop: Spacing.one,
  },
  profileRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
  },
  challengeCard: {
    gap: Spacing.two,
  },
  challengeLabel: {
    color: Brand.primary,
    letterSpacing: 1,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  playButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.five,
    marginTop: Spacing.one,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
