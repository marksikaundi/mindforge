import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type BackHeaderProps = {
  title: string;
  right?: React.ReactNode;
};

export function BackHeader({ title, right }: BackHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
        <ThemedText style={styles.arrow}>←</ThemedText>
      </Pressable>
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    minHeight: 44,
  },
  back: {
    width: 40,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
});
