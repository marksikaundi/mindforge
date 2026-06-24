import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Platform, StyleSheet, View } from 'react-native';

import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

function TabIconWrap({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.iconWrap,
        focused && {
          backgroundColor: hexAlpha(theme.accent, 0.14),
          ...(Shadow.card as object),
        },
      ]}>
      {children}
    </View>
  );
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          left: Spacing.three,
          right: Spacing.three,
          bottom: Platform.OS === 'ios' ? 28 : 16,
          height: 64,
          backgroundColor: theme.backgroundElement,
          borderTopWidth: 0,
          borderRadius: BorderRadius.xxl,
          paddingBottom: 0,
          paddingTop: 8,
          ...(Shadow.elevated as object),
          borderWidth: 1,
          borderColor: theme.borderSubtle,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIconWrap focused={focused}>
              <SymbolView name={{ ios: 'house.fill', android: 'home', web: 'home' }} size={20} tintColor={color} />
            </TabIconWrap>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused, color }) => (
            <TabIconWrap focused={focused}>
              <SymbolView
                name={{ ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' }}
                size={20}
                tintColor={color}
              />
            </TabIconWrap>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Ranks',
          tabBarIcon: ({ focused, color }) => (
            <TabIconWrap focused={focused}>
              <SymbolView
                name={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
                size={20}
                tintColor={color}
              />
            </TabIconWrap>
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ focused, color }) => (
            <TabIconWrap focused={focused}>
              <SymbolView
                name={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }}
                size={20}
                tintColor={color}
              />
            </TabIconWrap>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 30,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
