import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';
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
    <ScreenContainer>
      <View style={styles.content}>
        <View style={[styles.avatar, { borderColor: theme.border }]}>
          <ThemedText style={styles.avatarEmoji}>👤</ThemedText>
        </View>

        <ThemedText type="subtitle" style={styles.title}>
          Welcome Back
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Sign in to save your progress
        </ThemedText>

        <View style={styles.buttons}>
          <GameButton label="LOG IN" onPress={handleAuth} />
          <GameButton label="SIGN UP" variant="outline" onPress={handleAuth} />
        </View>

        <ThemedText themeColor="textSecondary" type="small" style={styles.or}>
          or continue with
        </ThemedText>

        <View style={styles.social}>
          <GameButton
            label="🌐  Google"
            variant="secondary"
            onPress={handleAuth}
            style={styles.socialBtn}
          />
          <GameButton
            label="🍎  Apple"
            variant="secondary"
            onPress={handleAuth}
            style={styles.socialBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
  buttons: {
    width: '100%',
    gap: Spacing.two,
  },
  or: {
    marginTop: Spacing.three,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  social: {
    width: '100%',
    gap: Spacing.two,
  },
  socialBtn: {
    borderRadius: BorderRadius.md,
  },
});
