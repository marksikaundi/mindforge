import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ScreenHeader } from '@/components/game/screen-header';
import { SectionHeader } from '@/components/game/section-header';
import { StatChip } from '@/components/game/stat-chip';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
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
    <ScreenContainer scroll ambient>
      <ScreenHeader title="Store" subtitle="Power-ups and themes to boost your game" />

      <Card accent={theme.star} style={styles.balanceCard}>
        <View>
          <ThemedText themeColor="textSecondary" style={styles.balanceLabel}>
            Your balance
          </ThemedText>
          <ThemedText style={styles.balanceValue}>⭐ {stars.toLocaleString()}</ThemedText>
        </View>
        <StatChip icon="💎" value="Premium" tint={theme.accentMuted} />
      </Card>

      <SectionHeader title="Power-ups" subtitle="Use during levels for an edge" />

      {STORE_POWERUPS.map((item) => (
        <Card key={item.id} style={styles.itemCard}>
          <View style={styles.itemRow}>
            <GradientSurface
              colors={[hexAlpha(theme.accent, 0.2), hexAlpha(theme.accent, 0.05)]}
              style={styles.itemIcon}>
              <ThemedText style={styles.itemEmoji}>{item.emoji}</ThemedText>
            </GradientSurface>
            <View style={styles.itemInfo}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.itemPrice}>
                ⭐ {item.price}
              </ThemedText>
            </View>
            <GameButton
              label="Buy"
              onPress={() => buy(item.price)}
              style={styles.buyBtn}
            />
          </View>
        </Card>
      ))}

      <SectionHeader title="Themes" subtitle="Personalize your experience" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.themesScroll}>
        {STORE_THEMES.map((themeItem, index) => {
          const swatch = themeItem.color;
          return (
            <Card key={themeItem.id} padded style={styles.themeCard}>
              <GradientSurface
                colors={[swatch, shadeHex(swatch, -25)]}
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
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.five,
  },
  balanceLabel: {
    fontSize: 13,
    marginBottom: Spacing.one,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
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
    fontSize: 16,
    fontWeight: '700',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  buyBtn: {
    minHeight: 40,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  themesScroll: {
    gap: Spacing.two,
    paddingBottom: Spacing.five,
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
    fontWeight: '700',
    fontSize: 14,
  },
  themePrice: {
    fontSize: 13,
  },
  activeBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  activeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
