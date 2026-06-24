import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/game/back-header';
import { Card } from '@/components/game/card';
import { ScreenContainer } from '@/components/game/screen-container';
import { SettingsRow, ToggleRow } from '@/components/game/settings-row';
import { ThemedText } from '@/components/themed-text';
import { Spacing, Typography } from '@/constants/theme';
import { useGame } from '@/context/game-context';

export default function SettingsScreen() {
  const {
    soundEnabled,
    musicEnabled,
    vibrationEnabled,
    darkMode,
    language,
    updateSettings,
  } = useGame();

  return (
    <ScreenContainer scroll ambient>
      <BackHeader title="Settings" />

      <ThemedText themeColor="textSecondary" style={styles.section}>
        Preferences
      </ThemedText>

      <Card style={styles.group}>
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
          label="Dark mode"
          value={darkMode}
          onValueChange={(v) => updateSettings({ darkMode: v })}
        />
      </Card>

      <ThemedText themeColor="textSecondary" style={styles.section}>
        General
      </ThemedText>

      <Card style={styles.group}>
        <SettingsRow label="Language" value={language} />
        <SettingsRow label="Help & support" />
        <SettingsRow label="Privacy policy" />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    ...Typography.label,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  group: {
    marginBottom: Spacing.two,
    paddingVertical: Spacing.one,
  },
});
