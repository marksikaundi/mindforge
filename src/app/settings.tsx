import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/game/back-header';
import { GameButton } from '@/components/game/game-button';
import { ScreenContainer } from '@/components/game/screen-container';
import { SettingsRow, ToggleRow } from '@/components/game/settings-row';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useGame } from '@/context/game-context';

export default function SettingsScreen() {
  const router = useRouter();
  const {
    soundEnabled,
    musicEnabled,
    vibrationEnabled,
    darkMode,
    language,
    updateSettings,
    logout,
  } = useGame();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <ScreenContainer scroll>
      <BackHeader title="SETTINGS" />

      <ThemedText type="smallBold" style={styles.section}>
        PREFERENCES
      </ThemedText>

      <View style={styles.group}>
        <ToggleRow
          label="Sound"
          value={soundEnabled}
          onValueChange={(v) => updateSettings({ soundEnabled: v })}
        />
        <ToggleRow
          label="Music"
          value={musicEnabled}
          onValueChange={(v) => updateSettings({ musicEnabled: v })}
        />
        <ToggleRow
          label="Vibration"
          value={vibrationEnabled}
          onValueChange={(v) => updateSettings({ vibrationEnabled: v })}
        />
        <ToggleRow
          label="Dark Mode"
          value={darkMode}
          onValueChange={(v) => updateSettings({ darkMode: v })}
        />
      </View>

      <ThemedText type="smallBold" style={styles.section}>
        GENERAL
      </ThemedText>

      <View style={styles.group}>
        <SettingsRow label="Language" value={language} />
        <SettingsRow label="Help & Support" />
        <SettingsRow label="Privacy Policy" />
      </View>

      <GameButton
        label="LOG OUT"
        variant="outline"
        onPress={handleLogout}
        style={styles.logout}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    letterSpacing: 1,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  group: {
    marginBottom: Spacing.two,
  },
  logout: {
    marginTop: Spacing.five,
    marginBottom: Spacing.five,
  },
});
