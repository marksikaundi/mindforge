import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { GameProvider } from '@/context/game-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GameProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" options={{ animation: 'fade' }} />
          <Stack.Screen name="onboarding" options={{ animation: 'fade_from_bottom' }} />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="level-select" />
          <Stack.Screen name="gameplay/[levelId]" />
          <Stack.Screen name="solution" options={{ presentation: 'modal' }} />
          <Stack.Screen name="level-complete" />
          <Stack.Screen name="daily-challenge" />
          <Stack.Screen name="challenge-result" />
          <Stack.Screen name="achievements" />
          <Stack.Screen name="settings" />
          <Stack.Screen
            name="hint"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
          <Stack.Screen
            name="correct"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
          <Stack.Screen
            name="incorrect"
            options={{ presentation: 'transparentModal', animation: 'fade' }}
          />
        </Stack>
      </ThemeProvider>
    </GameProvider>
  );
}
