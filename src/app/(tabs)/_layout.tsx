import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { AppIcon } from '@/components/ui/app-icon';
import { Brand } from '@/constants/thinkforge';
import { useTheme } from '@/hooks/use-theme';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Brand.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.backgroundElement,
          paddingBottom: Platform.OS === 'ios' ? 4 : 8,
          height: Platform.OS === 'ios' ? 88 : 64,
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
          tabBarIcon: ({ color }) => (
            <AppIcon icon={{ ios: 'house.fill', android: 'home', web: 'home' }} tintColor={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color }) => (
            <AppIcon
              icon={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }}
              tintColor={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="battle"
        options={{
          title: 'Battle',
          tabBarIcon: ({ color }) => (
            <AppIcon icon={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }} tintColor={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="rankings"
        options={{
          title: 'Rankings',
          tabBarIcon: ({ color }) => (
            <AppIcon
              icon={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }}
              tintColor={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <AppIcon icon={{ ios: 'person.fill', android: 'person', web: 'person' }} tintColor={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
