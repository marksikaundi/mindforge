import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/game/card';
import { GameButton } from '@/components/game/game-button';
import { GradientSurface } from '@/components/game/gradient-surface';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
import { hexAlpha, shadeHex } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { login } = useGame();

  const handleAuth = () => {
    login();
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer ambient padded={false}>
      <GradientSurface
        colors={[theme.accent, shadeHex(theme.accent, -40)]}
        style={styles.hero}>
        <View style={styles.logoRing}>
          <ThemedText style={styles.logoEmoji}>🧠</ThemedText>
        </View>
        <ThemedText style={styles.brand}>Think Smart</ThemedText>
        <ThemedText style={styles.tagline}>Train your mind. Think smarter.</ThemedText>
      </GradientSurface>

      <View style={styles.formWrap}>
        <Card style={styles.formCard}>
          <ThemedText style={styles.title}>Welcome back</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>
            Sign in to sync progress across devices
          </ThemedText>

          <View style={styles.buttons}>
            <GameButton label="Log in" onPress={handleAuth} />
            <GameButton label="Create account" variant="outline" onPress={handleAuth} />
          </View>

          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            <ThemedText themeColor="textSecondary" style={styles.or}>
              or continue with
            </ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
          </View>

          <View style={styles.social}>
            <GameButton
              label="Google"
              variant="secondary"
              onPress={handleAuth}
              style={styles.socialBtn}
            />
            <GameButton
              label="Apple"
              variant="secondary"
              onPress={handleAuth}
              style={styles.socialBtn}
            />
          </View>
        </Card>

        <ThemedText themeColor="textSecondary" style={styles.legal}>
          By continuing you agree to our Terms & Privacy Policy
        </ThemedText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: Spacing.six,
    paddingBottom: Spacing.five,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  logoRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: hexAlpha('#FFFFFF', 0.2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  logoEmoji: {
    fontSize: 44,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    marginTop: Spacing.one,
  },
  formWrap: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
  },
  formCard: {
    gap: Spacing.three,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.two,
  },
  buttons: {
    gap: Spacing.two,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginVertical: Spacing.two,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  or: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  social: {
    gap: Spacing.two,
  },
  socialBtn: {
    borderRadius: BorderRadius.md,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing.four,
    lineHeight: 18,
  },
});
