import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {subtitle && (
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
    marginBottom: Spacing.four,
    marginTop: Spacing.two,
  },
  title: {
    ...Typography.h1,
  },
  subtitle: {
    ...Typography.bodySm,
  },
});
