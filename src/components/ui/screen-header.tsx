import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenHeaderProps = {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
  showNotifications?: boolean;
  onMenuPress?: () => void;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  rightElement?: React.ReactNode;
};

export function ScreenHeader({
  title,
  showMenu,
  showBack,
  showNotifications,
  onMenuPress,
  onBackPress,
  onNotificationPress,
  rightElement,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
      <View style={styles.left}>
        {showBack && (
          <Pressable onPress={onBackPress} style={styles.iconButton}>
            <SymbolView
              name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
              size={22}
              tintColor={theme.text}
            />
          </Pressable>
        )}
        {showMenu && (
          <Pressable onPress={onMenuPress} style={styles.iconButton}>
            <SymbolView
              name={{ ios: 'line.3.horizontal', android: 'menu', web: 'menu' }}
              size={22}
              tintColor={theme.text}
            />
          </Pressable>
        )}
      </View>

      {title ? (
        <ThemedText style={styles.title}>{title}</ThemedText>
      ) : (
        <View style={styles.brandRow}>
          <SymbolView
            name={{ ios: 'brain.head.profile', android: 'psychology', web: 'psychology' }}
            size={24}
            tintColor={Brand.primary}
          />
          <ThemedText style={styles.brandName}>THINKFORGE</ThemedText>
        </View>
      )}

      <View style={styles.right}>
        {rightElement}
        {showNotifications && (
          <Pressable onPress={onNotificationPress} style={styles.iconButton}>
            <SymbolView
              name={{ ios: 'bell', android: 'notifications', web: 'notifications' }}
              size={22}
              tintColor={theme.text}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  right: {
    minWidth: 44,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.one,
  },
  iconButton: {
    padding: Spacing.one,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    color: Brand.primary,
  },
});
