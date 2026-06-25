import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

type CardProps = ViewProps & {
  accent?: string;
};

export function Card({ style, accent, children, ...props }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement },
        accent ? { borderLeftWidth: 4, borderLeftColor: accent } : undefined,
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: Spacing.three,
  },
});
