import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ACHIEVEMENTS, Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';

type Filter = 'all' | 'locked' | 'unlocked';

export default function AchievementsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = ACHIEVEMENTS.filter((a) => {
    if (filter === 'locked') return !a.unlocked;
    if (filter === 'unlocked') return a.unlocked;
    return true;
  });

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'locked', label: 'Locked' },
    { key: 'unlocked', label: 'Unlocked' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Achievements" showBack onBackPress={() => router.back()} />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setFilter(tab.key)}
            style={[styles.tab, filter === tab.key && { backgroundColor: Brand.primary }]}>
            <ThemedText style={[styles.tabLabel, filter === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.item}>
            <View style={[styles.iconWrap, item.unlocked && styles.iconUnlocked]}>
              <AppIcon icon={item.icon} size={24} tintColor={item.unlocked ? Brand.gold : Brand.primary} />
            </View>
            <View style={styles.itemContent}>
              <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.description}
              </ThemedText>
              {item.unlocked ? (
                <ThemedText type="small" style={styles.unlockedBadge}>
                  ✓ Unlocked {item.unlockedAt ? `· ${item.unlockedAt}` : ''}
                </ThemedText>
              ) : (
                <ProgressBar
                  current={item.progress}
                  max={item.total}
                  showLabel
                  color={Brand.primary}
                />
              )}
            </View>
          </Card>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: Spacing.three,
    gap: Spacing.two,
    paddingBottom: Spacing.six,
  },
  item: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUnlocked: {
    backgroundColor: 'rgba(253, 203, 110, 0.2)',
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  unlockedBadge: {
    color: Brand.success,
    fontWeight: '600',
    marginTop: 4,
  },
});
