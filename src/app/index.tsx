import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isOnboarded, completeOnboarding } = useUser();

  useEffect(() => {
    if (isOnboarded) {
      router.replace('/(tabs)');
    }
  }, [isOnboarded, router]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <SymbolView
              name={{ ios: 'brain.head.profile', android: 'psychology', web: 'psychology' }}
              size={64}
              tintColor={Brand.primary}
            />
            <View style={styles.gearOverlay}>
              <SymbolView
                name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
                size={28}
                tintColor={Brand.accent}
              />
            </View>
          </View>

          <ThemedText style={styles.appName}>{Brand.name}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.tagline}>
            {Brand.tagline}
          </ThemedText>

          <View style={styles.features}>
            {['Daily Challenges', 'AI-Generated Cases', 'Multiplayer Battles', 'Achievements'].map(
              (feature) => (
                <View key={feature} style={styles.featureRow}>
                  <SymbolView
                    name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                    size={18}
                    tintColor={Brand.success}
                  />
                  <ThemedText type="small">{feature}</ThemedText>
                </View>
              ),
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="GET STARTED"
            onPress={() => {
              completeOnboarding();
              router.replace('/(tabs)');
            }}
          />
          <Button title="LOG IN" variant="outline" onPress={() => router.push('/login')} />
          <Button
            title="Continue as Guest"
            variant="ghost"
            onPress={() => {
              completeOnboarding(true);
              router.replace('/(tabs)');
            }}
          />
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'space-between',
    paddingBottom: Spacing.four,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  logoWrap: {
    position: 'relative',
    marginBottom: Spacing.two,
  },
  gearOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -12,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 2,
    color: Brand.primary,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
  },
  features: {
    marginTop: Spacing.four,
    gap: Spacing.two,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
    marginTop: Spacing.three,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(108, 92, 231, 0.25)',
  },
  dotActive: {
    backgroundColor: Brand.primary,
    width: 24,
  },
});
