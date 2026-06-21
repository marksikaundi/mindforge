import { ScrollView, StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { STORE_POWERUPS, STORE_THEMES } from '@/data/game-data';
import { useGame } from '@/context/game-context';
import { useTheme } from '@/hooks/use-theme';

export default function StoreScreen() {
  const theme = useTheme();
  const { stars, spendStars } = useGame();

  const buy = (price: number) => {
    spendStars(price);
  };

  return (
    <ScreenContainer>
      <ThemedText type="subtitle" style={styles.title}>
        Store
      </ThemedText>

      <View style={[styles.balance, { borderColor: theme.border }]}>
        <ThemedText>Your balance:</ThemedText>
        <ThemedText type="smallBold">⭐ {stars}</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ThemedText type="smallBold" style={styles.section}>
          POWER-UPS
        </ThemedText>

        {STORE_POWERUPS.map((item) => (
          <View
            key={item.id}
            style={[styles.item, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.itemEmoji}>{item.emoji}</ThemedText>
            <View style={styles.itemInfo}>
              <ThemedText type="smallBold">{item.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                ⭐ {item.price}
              </ThemedText>
            </View>
            <GameButton
              label="BUY"
              onPress={() => buy(item.price)}
              style={styles.buyBtn}
            />
          </View>
        ))}

        <ThemedText type="smallBold" style={styles.section}>
          THEMES
        </ThemedText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themesScroll}>
          {STORE_THEMES.map((themeItem) => (
            <View
              key={themeItem.id}
              style={[styles.themeCard, { borderColor: theme.border }]}>
              <View
                style={[styles.themePreview, { backgroundColor: themeItem.color, borderColor: theme.border }]}
              />
              <ThemedText type="small" style={styles.themeName}>
                {themeItem.name}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {themeItem.price === 0 ? 'Free' : `⭐ ${themeItem.price}`}
              </ThemedText>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.three,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.four,
  },
  scroll: {
    paddingBottom: Spacing.five,
  },
  section: {
    letterSpacing: 1,
    marginBottom: Spacing.three,
    marginTop: Spacing.two,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.two,
    gap: Spacing.three,
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  buyBtn: {
    minHeight: 40,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  themesScroll: {
    marginBottom: Spacing.four,
  },
  themeCard: {
    width: 100,
    alignItems: 'center',
    padding: Spacing.two,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.two,
    gap: Spacing.one,
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  themeName: {
    fontWeight: '600',
  },
});
