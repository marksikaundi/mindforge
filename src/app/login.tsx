import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand } from '@/constants/thinkforge';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/context/user-context';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email.split('@')[0] || 'Brainsmith');
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader title="Log In" showBack onBackPress={() => router.back()} />
      <SafeAreaView edges={['bottom']} style={styles.content}>
        <ThemedText type="subtitle" style={styles.heading}>
          Welcome back
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subheading}>
          Sign in to continue sharpening your mind
        </ThemedText>

        <View style={styles.form}>
          <ThemedText type="smallBold">Email</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
            placeholder="you@example.com"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <ThemedText type="smallBold">Password</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
            placeholder="••••••••"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button title="LOG IN" onPress={handleLogin} />
        <Button title="Create an account" variant="ghost" onPress={() => router.back()} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  heading: {
    fontSize: 28,
  },
  subheading: {
    marginBottom: Spacing.two,
  },
  form: {
    gap: Spacing.two,
    flex: 1,
  },
  input: {
    borderRadius: 12,
    padding: Spacing.three,
    fontSize: 16,
    marginBottom: Spacing.two,
  },
});
