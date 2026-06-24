import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Shadow, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ModalOverlayProps = {
  children: React.ReactNode;
  onDismiss?: () => void;
};

export function ModalOverlay({ children, onDismiss }: ModalOverlayProps) {
  const theme = useTheme();

  return (
    <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
      {onDismiss && <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />}
      <View
        style={[
          styles.card,
          Shadow.elevated as object,
          {
            backgroundColor: theme.backgroundElevated,
            borderColor: theme.borderSubtle,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
});
