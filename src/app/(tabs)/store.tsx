import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ScreenHeader } from '@/components/game/screen-header';
import { SectionHeader } from '@/components/game/section-header';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { STORE_POWERUPS, STORE_THEMES } from '@/data/game-data';
import { useGame } from '@/context/game-context';
import { hexAlpha, shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function StoreScreen() {
  const theme = useTheme();
  const { stars, spendStars } = useGame();

  const buy = (price: number) => {
    spendStars(price);
  };

  return (
    <ScreenContainer scroll ambient tabInset>
      <ScreenHeader title="Store" subtitle="Power-ups and themes" />

      <GradientSurface
        colors={[theme.accent, shadeHex(theme.accent, -35)]}
        style={styles.balanceHero}>
        <ThemedText style={styles.balanceLabel}>Your balance</ThemedText>
        <ThemedText style={styles.balanceValue}>⭐ {stars.toLocaleString()}</ThemedText>
      </GradientSurface>

      <SectionHeader title="Power-ups" subtitle="Use during levels" />

      {STORE_POWERUPS.map((item) => (
        <Card key={item.id} style={styles.itemCard}>
          <View style={styles.itemRow}>
            <View style={[styles.itemIcon, { backgroundColor: hexAlpha(theme.accent, 0.1) }]}>
              <ThemedText style={styles.itemEmoji}>{item.emoji}</ThemedText>
            </View>
            <View style={styles.itemInfo}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.itemPrice}>
                ⭐ {item.price}
              </ThemedText>
            </View>
            <GameButton label="Buy" onPress={() => buy(item.price)} style={styles.buyBtn} />
          </View>
        </Card>
      ))}

      <SectionHeader title="Themes" subtitle="Personalize your app" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.themesScroll}>
        {STORE_THEMES.map((themeItem, index) => (
          <Card key={themeItem.id} padded style={styles.themeCard}>
            <GradientSurface
              colors={[themeItem.color, shadeHex(themeItem.color, -25)]}
              style={styles.themePreview}
            />
            <ThemedText style={styles.themeName}>{themeItem.name}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.themePrice}>
              {themeItem.price === 0 ? 'Free' : `⭐ ${themeItem.price}`}
            </ThemedText>
            {index === 0 && (
              <View style={[styles.activeBadge, { backgroundColor: hexAlpha(theme.success, 0.15) }]}>
                <ThemedText style={[styles.activeText, { color: theme.success }]}>Active</ThemedText>
              </View>
            )}
          </Card>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  balanceHero: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.four,
    marginBottom: Spacing.five,
    gap: Spacing.one,
  },
  balanceLabel: {
    ...Typography.label,
    color: 'rgba(255,255,255,0.75)',
  },
  balanceValue: {
    ...Typography.display,
    color: '#FFFFFF',
  },
  itemCard: {
    marginBottom: Spacing.two,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  itemIcon: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemEmoji: {
    fontSize: 26,
  },
  itemInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  itemName: {
    ...Typography.bodySm,
    fontWeight: '700',
  },
  itemPrice: {
    ...Typography.caption,
    fontWeight: '600',
  },
  buyBtn: {
    minHeight: 40,
    paddingHorizontal: Spacing.three,
  },
  themesScroll: {
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  themeCard: {
    width: 120,
    alignItems: 'center',
    gap: Spacing.two,
    marginRight: Spacing.two,
  },
  themePreview: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  themeName: {
    ...Typography.caption,
    fontWeight: '700',
  },
  themePrice: {
    ...Typography.caption,
  },
  activeBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  activeText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
