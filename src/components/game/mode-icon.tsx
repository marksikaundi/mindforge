import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { BorderRadius } from '@/constants/theme';
import { GameMode } from '@/context/game-context';
import { hexAlpha } from '@/lib/color';

const MODE_SYMBOLS: Record<
  GameMode,
  { ios: string; android: string; web: string }
> = {
  puzzles: { ios: 'puzzlepiece.extension.fill', android: 'extension', web: 'extension' },
  logic: { ios: 'function', android: 'function', web: 'function' },
  analyze: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  decisions: { ios: 'arrow.triangle.branch', android: 'alt_route', web: 'alt_route' },
};

type ModeIconProps = {
  mode: GameMode;
  color: string;
  size?: number;
};

export function ModeIcon({ mode, color, size = 22 }: ModeIconProps) {
  return (
    <View style={[styles.wrap, { backgroundColor: hexAlpha(color, 0.14) }]}>
      <SymbolView
        name={MODE_SYMBOLS[mode] as Parameters<typeof SymbolView>[0]['name']}
        size={size}
        tintColor={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
