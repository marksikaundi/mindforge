import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  Brand,
  FRIENDS_LEADERBOARD,
  GLOBAL_LEADERBOARD,
  type LeaderboardEntry,
} from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';
import { useTheme } from '@/hooks/use-theme';

type Tab = 'global' | 'friends' | 'country';

export default function RankingsScreen() {
  const theme = useTheme();
  const user = useUser();
  const [activeTab, setActiveTab] = useState<Tab>('global');

  const data =
    activeTab === 'friends'
      ? FRIENDS_LEADERBOARD
      : activeTab === 'country'
        ? GLOBAL_LEADERBOARD.slice(2, 8)
        : GLOBAL_LEADERBOARD;

  const currentUserEntry: LeaderboardEntry = {
    rank: 24,
    username: user.username,
    xp: user.xp,
    avatar: user.avatar,
    isCurrentUser: true,
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'global', label: 'Global' },
    { key: 'friends', label: 'Friends' },
    { key: 'country', label: 'Country' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Leaderboard" />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tab,
              activeTab === tab.key && { backgroundColor: Brand.primary },
            ]}>
            <ThemedText
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.tabLabelActive,
              ]}>
              {tab.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => `${item.rank}-${item.username}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card
            style={[
              styles.row,
              item.isCurrentUser && { borderColor: Brand.primary, borderWidth: 2 },
            ]}>
            <ThemedText
              style={[
                styles.rank,
                item.rank <= 3 && { color: Brand.gold },
              ]}>
              #{item.rank}
            </ThemedText>
            <ThemedText style={styles.rowAvatar}>{item.avatar}</ThemedText>
            <View style={styles.rowInfo}>
              <ThemedText style={styles.rowName}>{item.username}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.xp.toLocaleString()} XP
              </ThemedText>
            </View>
            {item.rank <= 3 && (
              <ThemedText style={styles.medal}>
                {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
              </ThemedText>
            )}
          </Card>
        )}
      />

      <Card style={[styles.pinnedRow, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.rank}>#{currentUserEntry.rank}</ThemedText>
        <Avatar emoji={currentUserEntry.avatar} size={36} />
        <View style={styles.rowInfo}>
          <ThemedText style={styles.rowName}>{currentUserEntry.username}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {currentUserEntry.xp.toLocaleString()} XP
          </ThemedText>
        </View>
        <ThemedText type="smallBold" style={{ color: Brand.primary }}>
          You
        </ThemedText>
      </Card>
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
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  pinnedRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: 'rgba(108, 92, 231, 0.2)',
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.two,
    borderRadius: 16,
  },
  rank: {
    width: 36,
    fontWeight: '800',
    fontSize: 16,
  },
  rowAvatar: {
    fontSize: 28,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    fontWeight: '700',
  },
  medal: {
    fontSize: 20,
  },
});
