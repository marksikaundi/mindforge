import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { UserProvider } from '@/context/user-context';
import { Brand } from '@/constants/thinkforge';

SplashScreen.preventAutoHideAsync().catch(() => {});

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Brand.primary,
    background: '#F8F9FC',
    card: '#FFFFFF',
  },
};

const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Brand.primary,
    background: '#0D0D12',
    card: '#1A1A24',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkThemeCustom : LightTheme}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="game-modes" options={{ presentation: 'card' }} />
            <Stack.Screen name="challenge/[mode]" options={{ presentation: 'card' }} />
            <Stack.Screen name="feedback" options={{ presentation: 'card' }} />
            <Stack.Screen name="case/[id]" options={{ presentation: 'card' }} />
            <Stack.Screen name="achievements" options={{ presentation: 'card' }} />
            <Stack.Screen name="shop" options={{ presentation: 'card' }} />
          </Stack>
        </ThemeProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
