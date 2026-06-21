import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SplashScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.replace('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.logoBox, { backgroundColor: theme.accent }]}>
        <ThemedText style={styles.logoLetter}>T</ThemedText>
      </View>

      <ThemedText style={styles.title}>Think Smart</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Challenge your mind
      </ThemedText>

      <View style={styles.loadingRow}>
        {loading && <ActivityIndicator color={theme.accent} />}
        <ThemedText type="small" themeColor="textSecondary">
          Loading…
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  logoLetter: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.six,
  },
});
