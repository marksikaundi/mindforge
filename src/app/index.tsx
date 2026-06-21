import { Redirect } from 'expo-router';

import { useGame } from '@/context/game-context';

export default function Index() {
  const { hasOnboarded, isLoggedIn } = useGame();

  if (!hasOnboarded) {
    return <Redirect href="/splash" />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
