import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.wrap}>
      <ThemedText themeColor="textSecondary" style={styles.title}>
        {title}
      </ThemedText>
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
    marginBottom: Spacing.three,
    marginTop: Spacing.one,
  },
  title: {
    ...Typography.label,
  },
  subtitle: {
    ...Typography.bodySm,
    marginTop: 2,
  },
});
