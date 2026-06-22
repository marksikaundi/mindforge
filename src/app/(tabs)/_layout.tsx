import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Platform, StyleSheet, View } from 'react-native';

import { BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabIconProps = {
  name: { ios: string; android: string; web: string };
  focused: boolean;
  color: string;
};

function TabIcon({ name, focused, color }: TabIconProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.iconWrap,
        focused && { backgroundColor: `${theme.accent}18` },
      ]}>
      <SymbolView name={name} size={22} tintColor={color} />
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
          backgroundColor: theme.backgroundElement,
          borderTopColor: theme.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={{ ios: 'house.fill', android: 'home', web: 'home' }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={{ ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Ranks',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 28,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
