import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ACHIEVEMENTS, Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUser();
  const recentAchievements = ACHIEVEMENTS.filter((a) => a.unlocked).slice(0, 3);
  const badges = ACHIEVEMENTS.filter((a) => a.unlocked);

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <Avatar emoji={user.avatar} size={80} showLevel level={user.level} />
          <ThemedText style={styles.username}>{user.username}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Level {user.level}
          </ThemedText>
          <View style={styles.xpBar}>
            <ProgressBar current={user.xpCurrent} max={user.xpMax} showLabel />
          </View>
        </View>

        <View style={styles.statsGrid}>
          {[
            { label: 'Challenges', value: user.challengesCompleted.toString() },
            { label: 'Win Rate', value: `${user.winRate}%` },
            { label: 'Streak', value: `${user.streak} days` },
          ].map((stat) => (
            <Card key={stat.label} style={styles.statCard}>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {stat.label}
              </ThemedText>
            </Card>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Badges</ThemedText>
          <Pressable onPress={() => router.push('/achievements')}>
            <ThemedText type="linkPrimary">View All</ThemedText>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesRow}>
          {badges.map((badge) => (
            <View key={badge.id} style={styles.badge}>
              <AppIcon icon={badge.icon} size={28} tintColor={Brand.gold} />
              <ThemedText type="small" style={styles.badgeLabel} numberOfLines={1}>
                {badge.title}
              </ThemedText>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Recent Achievements</ThemedText>
        </View>

        {recentAchievements.map((achievement) => (
          <Card key={achievement.id} style={styles.achievementRow}>
            <AppIcon icon={achievement.icon} size={24} tintColor={Brand.success} />
            <View style={styles.achievementInfo}>
              <ThemedText style={styles.achievementTitle}>{achievement.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {achievement.unlockedAt}
              </ThemedText>
            </View>
          </Card>
        ))}

        <Pressable onPress={() => router.push('/shop')} style={styles.shopLink}>
          <Card style={styles.shopCard}>
            <AppIcon
              icon={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }}
              size={24}
              tintColor={Brand.primary}
            />
            <View style={styles.shopInfo}>
              <ThemedText style={styles.shopTitle}>Shop & Rewards</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {user.coins} coins available
              </ThemedText>
            </View>
            <AppIcon
              icon={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={16}
              tintColor={Brand.primary}
            />
          </Card>
        </Pressable>
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
  profileHeader: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: Spacing.two,
  },
  xpBar: {
    alignSelf: 'stretch',
    marginTop: Spacing.two,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Brand.primary,
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
  badgesRow: {
    flexDirection: 'row',
  },
  badge: {
    alignItems: 'center',
    width: 80,
    marginRight: Spacing.two,
    padding: Spacing.two,
    backgroundColor: 'rgba(253, 203, 110, 0.15)',
    borderRadius: 12,
    gap: 4,
  },
  badgeLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontWeight: '600',
  },
  shopLink: {
    marginTop: Spacing.two,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  shopInfo: {
    flex: 1,
  },
  shopTitle: {
    fontWeight: '700',
  },
});
