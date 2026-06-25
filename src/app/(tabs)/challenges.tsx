import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function ChallengesScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10 * 3600 + 24 * 60 + 15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Daily Challenge" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.timerCard}>
          <ThemedText type="small" themeColor="textSecondary">
            New Challenge in
          </ThemedText>
          <ThemedText style={styles.timer}>{formatCountdown(countdown)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.timerHint}>
            Complete today&apos;s challenge before the timer runs out for bonus XP!
          </ThemedText>
        </Card>

        <Card accent={Brand.gold} style={styles.todayCard}>
          <ThemedText type="smallBold" style={styles.todayLabel}>
            TODAY&apos;S CHALLENGE
          </ThemedText>
          <ThemedText style={styles.todayTitle}>Spot the Fake News</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Read the headline and determine if it&apos;s real or fabricated. Earn 50 bonus XP!
          </ThemedText>
          <Button
            title="START CHALLENGE"
            onPress={() => router.push('/challenge/fake-news')}
            style={styles.startButton}
          />
        </Card>

        <View style={styles.previousSection}>
          <ThemedText style={styles.sectionTitle}>Previous Challenges</ThemedText>
          {[
            { title: 'Ethical Dilemma', date: 'Yesterday', xp: 40 },
            { title: 'Logic Puzzle', date: '2 days ago', xp: 35 },
            { title: 'Detective Case', date: '3 days ago', xp: 50 },
          ].map((item) => (
            <Card key={item.title} style={styles.previousItem}>
              <View style={styles.previousRow}>
                <View>
                  <ThemedText style={styles.previousTitle}>{item.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.date}
                  </ThemedText>
                </View>
                <ThemedText style={styles.xpBadge}>+{item.xp} XP</ThemedText>
              </View>
            </Card>
          ))}
        </View>

        <Button
          title="VIEW PREVIOUS CHALLENGES"
          variant="outline"
          onPress={() => {}}
        />
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
  timerCard: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.two,
  },
  timer: {
    fontSize: 48,
    fontWeight: '800',
    color: Brand.primary,
    fontVariant: ['tabular-nums'],
  },
  timerHint: {
    textAlign: 'center',
    paddingHorizontal: Spacing.three,
  },
  todayCard: {
    gap: Spacing.two,
  },
  todayLabel: {
    color: Brand.gold,
    letterSpacing: 1,
  },
  todayTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  startButton: {
    marginTop: Spacing.one,
  },
  previousSection: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  previousItem: {
    paddingVertical: Spacing.two,
  },
  previousRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previousTitle: {
    fontWeight: '600',
  },
  xpBadge: {
    color: Brand.success,
    fontWeight: '700',
  },
});
