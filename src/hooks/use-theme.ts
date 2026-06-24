import { Colors } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const osScheme = useColorScheme();
  const { darkMode } = useGame();

  const scheme = darkMode
    ? 'dark'
    : osScheme === 'unspecified'
      ? 'light'
      : osScheme;

  return Colors[scheme];
}
