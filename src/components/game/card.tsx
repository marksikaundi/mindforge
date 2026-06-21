import { StyleSheet, View, ViewStyle } from 'react-native';

import { BorderRadius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  accent?: string;
  padded?: boolean;
};

export function Card({ children, style, accent, padded = true }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        Shadow.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
          borderLeftColor: accent ?? theme.border,
          borderLeftWidth: accent ? 4 : 1,
        },
        padded && styles.padded,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: Spacing.four,
  },
});
