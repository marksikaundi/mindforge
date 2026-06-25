import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, SHOP_ITEMS, type ShopItem } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';

type Category = 'rewards' | 'powerups' | 'themes';

export default function ShopScreen() {
  const router = useRouter();
  const user = useUser();
  const [category, setCategory] = useState<Category>('powerups');

  const items = SHOP_ITEMS.filter((item) => item.category === category);

  const handlePurchase = (item: ShopItem) => {
    const success = user.spendCoins(item.price);
    if (success) {
      Alert.alert('Purchased!', `You bought ${item.title}`);
    } else {
      Alert.alert('Not enough coins', `You need ${item.price} coins but only have ${user.coins}.`);
    }
  };

  const tabs: { key: Category; label: string }[] = [
    { key: 'rewards', label: 'Rewards' },
    { key: 'powerups', label: 'Power-ups' },
    { key: 'themes', label: 'Themes' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader
        title="Shop"
        showBack
        onBackPress={() => router.back()}
        rightElement={
          <View style={styles.coinBadge}>
            <AppIcon
              icon={{ ios: 'dollarsign.circle.fill', android: 'monetization_on', web: 'monetization_on' }}
              size={18}
              tintColor={Brand.gold}
            />
            <ThemedText style={styles.coinText}>{user.coins}</ThemedText>
          </View>
        }
      />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setCategory(tab.key)}
            style={[styles.tab, category === tab.key && { backgroundColor: Brand.primary }]}>
            <ThemedText style={[styles.tabLabel, category === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.item}>
            <View style={styles.itemIcon}>
              <AppIcon icon={item.icon} size={28} tintColor={Brand.primary} />
            </View>
            <View style={styles.itemInfo}>
              <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.description}
              </ThemedText>
            </View>
            <Button
              title={`${item.price}`}
              onPress={() => handlePurchase(item)}
              style={styles.buyBtn}
            />
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
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(253, 203, 110, 0.2)',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 12,
  },
  coinText: {
    fontWeight: '700',
    color: Brand.gold,
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
    fontSize: 13,
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
    alignItems: 'center',
    gap: Spacing.three,
  },
  itemIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontWeight: '700',
  },
  buyBtn: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    minWidth: 70,
  },
});
