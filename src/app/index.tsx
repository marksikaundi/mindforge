import { Redirect } from 'expo-router';

import { useGame } from '@/context/game-context';

export default function Index() {
  const { hasOnboarded } = useGame();

  if (!hasOnboarded) {
    return <Redirect href="/splash" />;
  }

  return <Redirect href="/(tabs)" />;
}
